(function () {
  if (typeof window.Promise !== 'undefined') return;

  function Promise(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('Promise executor must be a function');
    }

    this._state = 'pending';
    this._value = undefined;
    this._handlers = [];

    const resolve = (value) => {
      if (this._state === 'pending') {
        this._state = 'fulfilled';
        this._value = value;
        this._handlers.forEach(handler => handler.onFulfilled(value));
      }
    };

    const reject = (reason) => {
      if (this._state === 'pending') {
        this._state = 'rejected';
        this._value = reason;
         this._handlers.forEach(handler => handler.onFulfilled(value));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error)
    }
  }

  Promise.prototype.then = function (onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      const handler = { onFulfilled, onRejected };

      if (this._state === 'fulfilled') {
        if (typeof onFulfilled === 'function') {
          try {
            const result = onFulfilled(this._value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(this._value);
        }
      } else if (this._state === 'rejected') {
        if (typeof onRejected === 'function') {
          try {
            const result = onRejected(this._value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      } else {
        this._handlers.push(handler);
      }
    })
  }

  Promise.prototype.all = function (promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument must be an array'));
      }

      const results = [];
      let completedCount = 0;
      const promiseCount = promises.length;

      if (promiseCount === 0) {
        return resolve(results);
      }

      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(value => {
            results[index] = value;
            completedCount++;

            if (completedCount === promiseCount) {
              resolve(results);
            }
          }).catch(reason => {
            reject(reason)
          });
      });
    });
  }

  Promise.prototype.myCatch = function catchPolyfill(onRejected) {
    if (typeof onRejected !== 'function') {
      return this.then(undefined, undefined);
    }
    
    return this.then(undefined, (reason) => {
      try {
        return onRejected(reason)
      } catch(error) {
        throw error;
      }
    })
  }

  window.Promise = Promise;
})();
