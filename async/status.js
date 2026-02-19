function getState(promise) {
  let status = 'pending';
  
  return new Promise((resolve) => {
    promise.then(() => {
      status = 'fulfilled';
    }).catch(() => {
      status = 'rejected';
    }).finally(() => {
      resolve(status);
    });
    
    setTimeout(() => {
      if (status === 'pending') {
        resolve('pending');
      }
     }, 0);
  });
}