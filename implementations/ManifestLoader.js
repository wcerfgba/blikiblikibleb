ManifestLoader = (function () {
  var _this = {

		withManifest: function (manifestUrl, cb) {
  		_this.xhrGetJSON(manifestUrl, function (manifest) {
    		_this.manifest = manifest;
    		cb.call(_this);
  		});
		},

		xhrGetJSON: function (url, cb) {
  		var oReq = new XMLHttpRequest();
  		oReq.addEventListener('load', function () {
    		cb( JSON.parse(this.responseText) );
    	});
  		oReq.open('GET', url);
  		oReq.send();
		},

		load: function (moduleName, cb) {

			for (var i = 0; i < _this.manifest[moduleName].requires.length; i++) {
  			var require = _this.manifest[moduleName].requires[i];
  			_this.load(require);
			}

			_this.appendScript( _this.manifest[moduleName].source, cb );

		},

		appendScript: function (url, cb) {
  		var s = document.createElement('script');
  		s.type = 'text/javascript';
  		s.onload = cb;
  		s.src = url;
  		document.head.appendChild(s);
		},
  		
  };

  return _this;

})();
