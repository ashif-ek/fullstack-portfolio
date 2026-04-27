export enum CircuitState {
  CLOSED = 'CLOSED', // Healthy
  OPEN = 'OPEN',     // Failing, failing fast
  HALF_OPEN = 'HALF_OPEN', // Testing recovery
}

export class CircuitBreaker {
  public state: CircuitState = CircuitState.CLOSED;
  private failures = 0;
  private nextAttemptTime = 0;
  
  constructor(
    public readonly name: string,
    private readonly failureThreshold: number = 3,
    private readonly cooldownMs: number = 30000
  ) {}

  public async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() > this.nextAttemptTime) {
        this.state = CircuitState.HALF_OPEN;
      } else {
        throw new Error(`CircuitBreaker ${this.name} is OPEN`);
      }
    }

    try {
      const result = await operation();
      this.recordSuccess();
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }

  private recordSuccess() {
    this.failures = 0;
    this.state = CircuitState.CLOSED;
  }

  private recordFailure() {
    this.failures++;
    if (this.failures >= this.failureThreshold) {
      this.state = CircuitState.OPEN;
      this.nextAttemptTime = Date.now() + this.cooldownMs;
    }
  }
}
