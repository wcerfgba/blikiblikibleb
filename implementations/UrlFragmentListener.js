IUrlFragmentListener = {

  _is: [
    'IListener',
  ],

};


UrlFragmentListener = (function () {
  var _this = {

		onchange: function(cb) {
  		var prev = undefined;
			setInterval(function () {
  			var curr = _this.getFragment();
  			if (prev !== curr) {
    			prev = curr;
    			cb(curr);
  			}
			}, 200);
		};

		getFragment: function () {
  		return window.location.hash.substr(1);
		},

  };

  return _this;
})();
