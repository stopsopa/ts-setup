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
  waiters = [];
  constructor(permits) {
    this.permits = permits;
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
      this.permits += 1;
    }
  }
}
