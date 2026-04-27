import { DataSource } from './logger';

interface MetricSnapshot {
  successes: number;
  failures: number;
  totalLatencyMs: number;
}

export class MetricsCollector {
  private static instance: MetricsCollector;
  // Use Immutable snapshots for concurrency safety
  private metrics: Record<DataSource, MetricSnapshot> = {
    API: { successes: 0, failures: 0, totalLatencyMs: 0 },
    DB: { successes: 0, failures: 0, totalLatencyMs: 0 },
    MOCK: { successes: 0, failures: 0, totalLatencyMs: 0 },
  };

  private constructor() {}

  public static getInstance(): MetricsCollector {
    if (!MetricsCollector.instance) {
      MetricsCollector.instance = new MetricsCollector();
    }
    return MetricsCollector.instance;
  }

  public recordSuccess(source: DataSource, latencyMs: number) {
    // Immutable update to prevent race conditions
    const current = this.metrics[source];
    this.metrics = {
      ...this.metrics,
      [source]: {
        successes: current.successes + 1,
        failures: current.failures,
        totalLatencyMs: current.totalLatencyMs + latencyMs,
      }
    };
  }

  public recordFailure(source: DataSource) {
    const current = this.metrics[source];
    this.metrics = {
      ...this.metrics,
      [source]: {
        ...current,
        failures: current.failures + 1,
      }
    };
  }

  public getSnapshot(source: DataSource): MetricSnapshot {
    return { ...this.metrics[source] };
  }

  public getAverageLatency(source: DataSource): number {
    const snap = this.getSnapshot(source);
    if (snap.successes === 0) return 0;
    return snap.totalLatencyMs / snap.successes;
  }
  
  public getSuccessRate(source: DataSource): number {
    const snap = this.getSnapshot(source);
    const total = snap.successes + snap.failures;
    if (total === 0) return 1; // Default to 100% if no data
    return snap.successes / total;
  }
}

export const metrics = MetricsCollector.getInstance();
