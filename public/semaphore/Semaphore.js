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
  permits;
  maxPermits;
  waiters = [];
  constructor(permits) {
    this.maxPermits = this.permits = permits;
  }
  acquire() {
    return new Promise((resolve) => {
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
      if (this.permits !== this.maxPermits) {
        this.permits += 1;
      }
    }
  }
}
