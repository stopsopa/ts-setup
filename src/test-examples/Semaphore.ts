/**
 * Always use with finally block
 *
 * const semaphore = new Semaphore(3);
 * try {
 *   await semaphore.acquire();
 *   // critical section
 * } finally {
 *   semaphore.release();
 * }
 */
export default class Semaphore {
  private permits: number;
  private waiters: (() => void)[] = [];
  constructor(permits: number) {
    this.permits = permits;
  }
  acquire() {
    return new Promise<void>((resolve) => {
      if (this.permits > 0) {
        this.permits -= 1;
        resolve();
      } else {
        this.waiters.push(resolve);
      }
    });
  }
  release() {
    const next = this.waiters.shift();
    if (next) {
      next();
    } else {
      this.permits += 1;
    }
  }
}
