class AsyncQueueWithLimit {
  constructor(concurrencyLimit) {
    this.concurrencyLimit = concurrencyLimit;
    
    this.queue = [];
    this.runningCount = 0;
  }

  async enqueue(task) {
    return new Promise((resolve, reject) => {
      const queueItem = { task, resolve, reject };

      if (this.runningCount < this.concurrencyLimit) {
        this.runTask(queueItem);
      } else {
        this.queue.push(queueItem);
      }
    });
  }

  async runTask() {
    const { task, resolve, reject } = queueItem;

    this.runningCount++;

    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.runningCount--;
      this.processNextTask();
    }
  }

   processNextTask() {
    if (this.queue.length > 0 && this.runningCount < this.concurrencyLimit) {
      const nextTask = this.queue.shift();
      this.runTask(nextTask);
    }
  }
} 