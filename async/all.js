
const p1 = new Promise(r => setTimeout(r, rand(), "A"));
const p2 = new Promise(r => setTimeout(r, rand(), "B"));
const p3 = new Promise(r => setTimeout(r, rand(), "C"));
const p4 = new Promise(r => setTimeout(r, rand(), "D"));

function isThereEmptyElement(array) {
  return (array || []).findIndex(item => typeof item === 'undefined') > -1
}

function isPromise(obj) {
  return obj !== null && typeof obj === 'object' && typeof obj.then === 'function';
}

function all(_iterable) {
  return new Promise(function (resolve, reject) {
    let result = [];
    let total = 0;
    const iterable = [..._iterable]; // для возможности передачи сетов
    
    if (iterable.length < 1) {
      resolve([]);
    }
    
    iterable.forEach((item, index) => {
      if (isPromise(item)) {
         Promise.resolve(item).then((res) => {
          result[index] = res;
          total++;
          if (!isThereEmptyElement(result) && result.length === iterable.length) {
            resolve(result);
          }
        }).catch((error) => {
          reject(error)
        })
      } else {
        result[index] = res;
        total++;
        
         if (!isThereEmptyElement(result) && result.length === iterable.length) {
            resolve(result);
          }
      }
    });
  });
}

all([p1, 2, 5, p4]).then((response) => {
  console.log('result', response);
}, (reject) => {
  console.log('reject', reject)
})