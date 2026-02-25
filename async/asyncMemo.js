// мемоизация ассинхронной функции
/* const double = async x => x * 2;

const mDouble = asyncMemo(double);

mDouble(10).then(x => console.log(x));

*/
function asyncMemo(fn) {
  const cache = new Map();
  
  return async function(...args) {
    // Создаём ключ на основе аргументов
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    try {
      const result = await fn(...args);
      cache.set(key, result);
      return result;
    } catch (error) {
      cache.set(key, Promise.reject(error));
      throw error;
    }
  }
}