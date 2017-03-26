let Promise = require('bluebird');

Promise.config({ cancellable: true });


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

  listen(i) {
    let _this = this;
    
		return function listener(v) {
  		// let q = _this.ps[1 - i]; by reference

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
