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
    	req.open("GET", _this.nameFilter(name));
    	req.send();
  	});
  }

}

module.exports = XhrRepository;
