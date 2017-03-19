IBlikiBlikiBleb = {

	_is: [
  	'IInitiable',
  	'IPrefixing',
	],

	_uses: {
  	req: 'IListener',
		repo:	'IRepository',
  	v: 'IView',
	},

};


BlikiBlikiBleb = (function () {
  var _this = {

		prefix: function () { return 'blikiblikibleb_'; },

		init:	function () {

  		_this.v.init();
  		
  		_this.req.onchange(_this.visit);

		},

		visit: function (id) {

  		_this.repo.get(id, function (content) {
    		_this.v.set( content );
  		});

		},

  };

  return _this;
})();
