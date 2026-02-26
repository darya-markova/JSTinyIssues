async function polling(fetcher, isCompleted, ms) {
  while (true) {
    try {
      const result = await fetcher();

      if (isCompleted(result)) {
        return result;
      }
      
      await new Promise(resolve => setTimeout(resolve, ms));
    } catch (error) {
      console.warn('Request failed, retrying in', ms, 'ms:', error);

      await new Promise(resolve => setTimeout(resolve, ms));
    }
  }
}