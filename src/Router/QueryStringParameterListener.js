let Promise = require('bluebird');

let qs = require('qs');


/* A QueryStringFragmentListener acts like an IRouter to permit subscribing to
 * changes to the value of a named query string parameter of the window URL.
 * It does this by providing a promise that resolves with the new value of the
 * parameter on change.
 */

class QueryStringParameterListener {

  constructor(param) {
    this.param = param;
  }
  
  getRoute() {
    let params = window.location.search.substr(1);
    if ( ! params ) { return ''; }
    params = qs.parse( params );
    if ( ! params || ! params[this.param] ) { return ''; }
    return params[this.param];
  }

  onRouteChange() {
    let _this = this;
    
    return new Promise( (resolve, reject) => {

      let prev = _this.getRoute();

      let listener = () => {
        var curr = _this.getRoute();

        if ( ! curr ) {
          window.addEventListener( 'popstate', listener );
        } else if ( curr !== prev ) {
          resolve(curr);
        }
        
      };

      window.addEventListener( 'popstate', listener );
      
    });
  }

}


module.exports = QueryStringParameterListener;
