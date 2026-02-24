/*
* Необходимо реализовать фунцию sleep, которая принимает время ms (в миллисекундах), 
* на которое замедляется выполнение цепочки промисов.
*
*/

// замедление выполнения цепочки промисов

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const p1 = Promise.resolve(5);

p1
  .then(x => {
    console.log(x);
    return x;
  })
  .then(y => {
    console.log(2 * y);
    return 2 * y;
  })
  .then(sleep(2000))
  .then(z => {
    console.log(3 * z);
    return 2 * z;
  })