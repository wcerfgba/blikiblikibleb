let Promise = require('bluebird');

Promise.config({ cancellable: true });


/* A PromiseListener takes a promise-returning function and a callback and
 * sets up two 'threads' of promises. When one promise resolves, the other
 * promise is cancelled and reconstructed. There is always one unfulfilled
 * promise, and when that promise is fulfilled it cancels the other one and
 * pre-empts it.
 *
 * Useful for subscribing to a stream of instances of the same event.
 */

class PromiseListener {

  constructor(promiseFactory, promiseFilter) {
    this.promiseFactory = promiseFactory;
    this.promiseFilter = promiseFilter;
    
    this.ps = [
      this.promiseFilter(
        this.promiseFactory()
            .then(this.listen(0))
      ),
      Promise.resolve()
    ];
  }

  /* This is where the magic happens. We take the raw promise from the factory
   * and add this handler. When the promise resolves, we cancel the other
   * promise and set it up just like this one.
   */
  listen(i) {
    let _this = this;
    
    return function listener(v) {
      _this.ps[1 - i].cancel();
      _this.ps[1 - i] =
        _this.promiseFilter(
          _this.promiseFactory()
              .then(_this.listen(1 - i))
        );

      return v;
    };
  };

}

module.exports = PromiseListener;
