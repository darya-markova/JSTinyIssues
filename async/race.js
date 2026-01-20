/* 

Функция race возвращает промис,
который завершается значением и статусом первого завершившегося промиса из коллекции. 
Если в iterable есть элементы, не являющиеся промисом, 
то итоговый промис зарезолвится первым из них.

*
*/
function isPromise(obj) {
  return obj !== null && typeof obj === 'object' && typeof obj.then === 'function';
}

function race(iterable) {
    return new Promise((resolve, reject) => {      
      [...iterable].forEach(item => {
        if (isPromise(item)) {
          item.then(success => {
            resolve(item);
          }, (failure) => {
            reject(failure)
          });
        } else {
          resolve(item)
        }
    });
  });
}