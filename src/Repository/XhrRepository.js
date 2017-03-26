/* An XhrRepository allows you to retrieve data using a XMLHttpRequest as a
 * promise, using a function to turn a name for a document in the repository
 * in to a URL. */

class XhrRepository {

  constructor(nameFilter) {
    this.nameFilter = nameFilter;
  }

  retrieve(name) {
    let _this = this;
    
    return new Promise( function retrievePromise(resolve, reject, onCancel) {
    	var req = new XMLHttpRequest();
    	req.addEventListener(
    		'load',
    		function () {
      		return resolve(this.responseText);
      	}
      );
      // Transform document name into URL.
    	req.open("GET", _this.nameFilter(name));
    	req.send();
  	});
  }

}

module.exports = XhrRepository;
