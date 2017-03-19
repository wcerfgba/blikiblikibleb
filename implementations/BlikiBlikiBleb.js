BlikiBlikiBleb = (function () {
	var _this = {

		init: function () {

			_this.injectDOMRoot();
			_this.bindFragmentListener();
			window.location.hash = 'index';
  		
		},

		injectDOMRoot: function () {
  		var d = document.createElement('div');
  		d.id = 'blikiblikibleb';
  		document.body.appendChild(d);
		},

		getDOMRoot: function () {
  		return document.getElementById('blikiblikibleb');
		},

		bindFragmentListener: function () {

			_this.oldFragment = undefined;

			setInterval(function () {
  			var newFragment = _this.getFragment();
  			if ( _this.oldFragment !== newFragment ) {
    			_this.visit( newFragment );
    			_this.oldFragment = newFragment;
  			}
			}, 1000);

		},

		visit: function (path) {

  		XHRUtils.get('assets/pages/' + path + '.md', function (text) {
    		_this.getDOMRoot().innerHTML = text;
  		});

		},

		getFragment: function () {
  		return window.location.hash.substr(1);
		},

	};

	return _this;
})();
