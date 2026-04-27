export type DataSource = 'API' | 'DB' | 'MOCK';

export interface LogEntry {
  timestamp: string;
  operation: string;
  source: DataSource;
  latencyMs: number;
  fallbackChain: DataSource[];
  error?: string;
  schemaValid?: boolean;
}

export const logger = {
  info: (message: string, context?: Record<string, any>) => {
    console.log(JSON.stringify({ level: 'INFO', message, ...context, timestamp: new Date().toISOString() }));
  },
  warn: (message: string, context?: Record<string, any>) => {
    console.warn(JSON.stringify({ level: 'WARN', message, ...context, timestamp: new Date().toISOString() }));
  },
  error: (message: string, context?: Record<string, any>) => {
    console.error(JSON.stringify({ level: 'ERROR', message, ...context, timestamp: new Date().toISOString() }));
  },
  recordRequest: (entry: LogEntry) => {
    const level = entry.error ? 'ERROR' : 'INFO';
    console.log(JSON.stringify({ level, ...entry }));
  }
};
