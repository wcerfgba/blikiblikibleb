IBlikiBlikiPageRepo = {

  _is:	[
    'IRepository'
  ],

  _has:	[
    repo:	'XhrRepository'
  ],

};


BlikiBlikiPageRepo = (function () {
  var _this = {

    get: function (id, cb) {
      return _this.repo.get( 'assets/pages/' + id + '.md', cb );
    },

  };

  return _this;
})();

