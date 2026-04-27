export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 1
): Promise<T> {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      return await operation();
    } catch (error) {
      attempt++;
      if (attempt > maxRetries) {
        throw error;
      }
      // Minimal backoff
      await new Promise(res => setTimeout(res, 50 * attempt));
    }
  }
  throw new Error('Unreachable code in retry logic');
}
