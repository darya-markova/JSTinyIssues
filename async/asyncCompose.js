// Функция compose принимает массив асинхронных функций и возвращает асинхронную функцию. 
// Эта функция принимает один аргумент и последовательно справа налево выполняет асинхронные функции

/* const square = x => new Promise(r => setTimeout(r, 2000, x ** 2));
const divideBy5 = x => new Promise(r => setTimeout(r, 1500, x / 5));
const multiplyBy3 = x => new Promise(r => setTimeout(r, 500, x * 3));

const foo = compose([square, divideBy5, multiplyBy3]); 

console.time("xxx");
foo(10).then(value => {
  console.log(value);
  console.timeEnd("xxx");
});

*/

function compose(functions) {
  return async function(initialValue) {
    return functions.reduceRight(async (accumulatorPromise, currentFn) => {
      const accumulatedValue = await accumulatorPromise;
      return currentFn(accumulatedValue);
    }, Promise.resolve(initialValue));
  };
}

function compose(functions) {
  return async function(initialValue) {
    let result = initialValue;
    
    for (let i = functions.length - 1; i >= 0; i--) {
      result = await functions[i](result);
    }
    
    return result;
  };
}

