IXhrRepository = {

  _is: [
    'IRepository',
  ],

  _has:	[
    req:	'XMLHttpRequest',
  ],

};


IXhrRepository = (function () {
  var _this = {

		get: function (url, cb) {
  		var req = new _this.req();
  		req.addEventListener('load', function () { return cb(this.responseText); });
  		req.open("GET", url);
  		req.send();
		},

  };

  return _this;
})();
