function isThereEmptyElement(array) {
  return (array || []).findIndex(item => typeof item === 'undefined') > -1
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
      Promise.resolve(item).then((res) => {
          result[index] = res;
          total++;
          if (!isThereEmptyElement(result) && result.length === iterable.length) {
            resolve(result);
          }
        }).catch((error) => {
          reject(error)
        })
    });
  });
}