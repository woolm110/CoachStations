var Imagination = Imagination || {};

Imagination.app = (function() {
  'use strict';

  var _private = {
    init: function() {
      console.log('app init');
    },
  };

  return {
    init: _private.init
  };

}());
