import { dbSource } from './sources/db';
import { mockSource } from './sources/mock';
import { withTimeout } from '../resilience/timeout';
import { withRetry } from '../resilience/retry';
import { CircuitBreaker } from '../resilience/circuitBreaker';
import { logger, DataSource } from '../observability/logger';
import { metrics } from '../observability/metrics';

const TIMEOUT_DB = 800;

// Circuit breaker for DB to prevent cascading failures if database goes down
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
    if (forced && (forced === 'DB' || forced === 'MOCK')) return [forced, 'MOCK'];

    // Strict DB -> MOCK architecture. API is deprecated and removed.
    return ['DB', 'MOCK'];
  }

  public async fetch<T>(
    entityName: string,
    dbOp: () => Promise<T>,
    mockOp: () => Promise<T>
  ): Promise<T> {
    const order = this.getPreferredOrder();
    const fallbacksUsed: DataSource[] = [];
    let lastError: any = null;

    for (const source of order) {
      try {
        if (source === 'DB' && process.env.USE_DB_FALLBACK !== 'false') {
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
