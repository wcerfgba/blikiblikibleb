XHRUtils = (function () {
	var _this = {

		get: function (url, cb) {
  		var oReq = new XMLHttpRequest();
  		oReq.addEventListener('load', function () {
    		cb(this.responseText);
    	});
  		oReq.open('GET', url);
  		oReq.send();
		},

	};

	return _this;
})();
