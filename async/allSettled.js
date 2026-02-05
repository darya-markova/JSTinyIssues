function isThereEmptyElement(array) {
  return (array || []).findIndex(item => typeof item === 'undefined') > -1
}

function allSettled(_iterable) {
  return new Promise(function (resolve, reject) {
    let result = [];
    let total = 0;
    const iterable = [..._iterable];
    
    if (iterable.length < 1) {
      resolve([]);
    }
    
    iterable.forEach((item, index) => {
      Promise.resolve(item).then((res) => {
          result[index] = { value: res, status: 'fulfilled' };
          total++;
          
          if (!isThereEmptyElement(result) && result.length === iterable.length) {
            resolve(result);
          }
        }).catch((error) => {
          result[index] = { reason: error, status: 'rejected'};

          if (!isThereEmptyElement(result) && result.length === iterable.length) {
            resolve(result);
          }
        })
    });
  });
}