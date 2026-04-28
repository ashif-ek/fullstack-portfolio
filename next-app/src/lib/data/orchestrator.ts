import { apiSource } from './sources/api';
import { dbSource } from './sources/db';
import { mockSource } from './sources/mock';
import { withTimeout } from '../resilience/timeout';
import { withRetry } from '../resilience/retry';
import { CircuitBreaker } from '../resilience/circuitBreaker';
import { logger, DataSource } from '../observability/logger';
import { metrics } from '../observability/metrics';

const TIMEOUT_API = 1000;
const TIMEOUT_DB = 800;
const MIN_SAMPLES_FOR_ADAPTIVE = 5;

const apiBreaker = new CircuitBreaker('API', 3, 30000);
const dbBreaker = new CircuitBreaker('DB', 3, 30000);

export class DataOrchestrator {
  private async executeWithResilience<T>(
    sourceName: DataSource,
    breaker: CircuitBreaker,
    timeoutMs: number,
    operation: () => Promise<T>,
    fallbackChain: DataSource[]
  ): Promise<T> {
    const start = Date.now();
    try {
      const result = await breaker.execute(() => 
        withRetry(() => withTimeout(operation(), timeoutMs), 1)
      );
      const latency = Date.now() - start;
      metrics.recordSuccess(sourceName, latency);
      logger.recordRequest({
        timestamp: new Date().toISOString(),
        operation: 'fetch',
        source: sourceName,
        latencyMs: latency,
        fallbackChain
      });
      return result;
    } catch (error) {
      metrics.recordFailure(sourceName);
      throw error;
    }
  }

  private getPreferredOrder(): DataSource[] {
    const forced = process.env.FORCE_SOURCE?.toUpperCase() as DataSource;
    if (forced) return [forced, 'DB', 'MOCK'];

    // Django API is disconnected — go directly to DB → MOCK.
    // If USE_API is explicitly set to 'true', re-enable adaptive routing.
    if (process.env.USE_API !== 'true') {
      return ['DB', 'MOCK'];
    }

    const apiSnap = metrics.getSnapshot('API');
    const dbSnap = metrics.getSnapshot('DB');

    // Cold start strategy
    if (apiSnap.successes < MIN_SAMPLES_FOR_ADAPTIVE || dbSnap.successes < MIN_SAMPLES_FOR_ADAPTIVE) {
      return ['DB', 'API', 'MOCK'];
    }

    // Adaptive logic: load awareness + latency
    const apiLatency = metrics.getAverageLatency('API');
    const dbLatency = metrics.getAverageLatency('DB');
    const apiSuccessRate = metrics.getSuccessRate('API');
    const dbSuccessRate = metrics.getSuccessRate('DB');

    if (apiSuccessRate < 0.8 || (apiLatency > dbLatency * 1.5 && dbSuccessRate > 0.9)) {
      return ['DB', 'API', 'MOCK'];
    }

    return ['DB', 'API', 'MOCK'];
  }

  public async fetch<T>(
    entityName: string,
    apiOp: () => Promise<T>,
    dbOp: () => Promise<T>,
    mockOp: () => Promise<T>
  ): Promise<T> {
    const order = this.getPreferredOrder();
    const fallbacksUsed: DataSource[] = [];
    let lastError: any = null;

    for (const source of order) {
      try {
        if (source === 'API' && process.env.USE_API !== 'false') {
          return await this.executeWithResilience('API', apiBreaker, TIMEOUT_API, apiOp, fallbacksUsed);
        }
        if (source === 'DB' && process.env.USE_DB_FALLBACK !== 'false') {
          fallbacksUsed.push('API');
          return await this.executeWithResilience('DB', dbBreaker, TIMEOUT_DB, dbOp, fallbacksUsed);
        }
        if (source === 'MOCK' && process.env.USE_MOCK_FALLBACK !== 'false') {
          fallbacksUsed.push('DB');
          // Mock is always safe
          const start = Date.now();
          const res = await mockOp();
          metrics.recordSuccess('MOCK', Date.now() - start);
          logger.recordRequest({
            timestamp: new Date().toISOString(),
            operation: `fetch_${entityName}`,
            source: 'MOCK',
            latencyMs: Date.now() - start,
            fallbackChain: fallbacksUsed
          });
          return res;
        }
      } catch (e) {
        lastError = e;
      }
    }

    logger.error('All data sources failed', { entityName, lastError });
    throw new Error('All data sources exhausted');
  }
}

export const orchestrator = new DataOrchestrator();
