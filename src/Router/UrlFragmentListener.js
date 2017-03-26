let Promise = require('bluebird');


/* A UrlFragmentListener acts like an IRouter to permit subscribing to changes
 * of the window URL fragment. It does this by providing a promise that
 * resolves with the new value of the fragment (sans hash) on change.
 *
 * The present implementation relies on a setInterval to poll the URL fragment
 * at regular intervals, which may change in the future.
 */

class UrlFragmentListener {

  constructor(fragmentChangeInterval = 200) {
    this.fragmentChangeInterval = fragmentChangeInterval;
  }
  
  getFragment() {
    return window.location.hash.substr(1);
  }

  /* Return a promise which resolves when the fragment changes. Store the
   * fragment at creation time and poll for changes, resolving on change.
   */
  onFragmentChange() {
    return new Promise( (resolve, reject) => {
      let prev = this.getFragment();
      let timer = setInterval( () => {
        let curr = this.getFragment();
        if ( prev !== curr ) {
          // When we detect a fragment change, we can clear this timeout as
          // there is no need to watch the URL fragment any more, and resolve
          // the promise with the value.
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
