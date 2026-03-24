// https://github.com/darya-markova?tab=repositories
class CancellablePromise {
  constructor(executor) {
    this._isCancelled = false;
    this._cancelReason = 'This promise is cancelled by user';

    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;

      try {
        executor(this._resolveWrapper.bind(this), this._rejectWrapper.bind(this));
      } catch (error) {
        this._reject(error);
      }
    });
  }
  
  _resolveWrapper(value) {
    if (!this._isCancelled) {
      this._resolve(value);
    }
  }
 
  _rejectWrapper(reason) {
    if (!this._isCancelled) {
      this._reject(reason);
    }
  }
}

CancellablePromise.create = function(executor) {
  const cancellable = new CancellablePromise(executor);
  return cancellable;
};

CancellablePromise.prototype.cancel = function(reason) {
  if (!this._isCancelled) {
    this._isCancelled = true;
    this._reject(new Error(reason));
  }
};

const cancellablePromise = CancellablePromise.create( (resolve, reject) => {} );

cancellablePromise.promise.then(result => {
  console.log('Результат:', result); 
});

setTimeout(() => {
  cancellablePromise.cancel();
  console.log(cancellablePromise)
}, 2000);

/* const cancellablePromise = new CancellablePromise((resolve, reject) => {
  const timer = setTimeout(() => {
    resolve('Успех!');
  }, 2000);

  return () => clearTimeout(timer);
}); */
