function withRetry(fn, limit) {
  return async function (...args) {
    const errors = [];

    for (let attempt = 1; attempt <= limit; attempt++) {
      try {
        const result = await fn(...args);
        return result;
      } catch (error) {
        errors.push(error);

        if (attempt === limit) {
          throw new AggregateError(errors, 'Too Many Calls')
        }
        continue;
      }
    }
  }
}