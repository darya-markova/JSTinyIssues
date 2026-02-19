const p1 = Promise.reject("💣")
const p2 = Promise.reject("🌪️")
const p3 = Promise.reject("🔥") 

function isPromise(obj) {
  return obj !== null && typeof obj === 'object' && typeof obj.then === 'function';
}

function isThereEmptyElement(array) {
  return (array || []).findIndex(item => typeof item === 'undefined') > -1
}

function any(_iterable) {
  return new Promise(function (resolve, reject) {
    const iterable = [..._iterable]; 
    
    let result = [];
    let errors = [];
    
    if (iterable.length < 1) {
      reject(
        new AggregateError([])
      )
      
      return;
    }
    
    iterable.forEach((item, index) => {
      if (isPromise(item)) {
         Promise.resolve(item).then((res) => {
          resolve(res)
        }).catch((error) => {
           result[index] = true;
           errors[index] = error;
           
          if (!isThereEmptyElement(result) && result.length === _iterable.length) {
            reject(new AggregateError(errors, 'All promises were rejected'))
          }
        })
      } else {
        resolve(item)
      }
    }); 
  });
}