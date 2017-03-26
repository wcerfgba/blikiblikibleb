let Promise = require('bluebird');


class UrlFragmentListener {

	constructor(fragmentChangeInterval = 200) {
  	this.fragmentChangeInterval = fragmentChangeInterval;
	}
  
  getFragment() {
    return window.location.hash.substr(1);
  }


  onFragmentChange() {
    return new Promise( (resolve, reject) => {
      let prev = this.getFragment();
      let timer = setInterval( () => {
      	let curr = this.getFragment();
      	if ( prev !== curr ) {
        	clearTimeout(timer);
        	resolve(curr);
      	}
      }, this.fragmentChangeInterval);
  	});
	}

	getRoute() { return this.getFragment(); }

	onRouteChange() { return this.onFragmentChange(); }

}


module.exports = UrlFragmentListener;
