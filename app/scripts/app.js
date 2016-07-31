var Imagination = Imagination || {};

Imagination.app = (function() {
  'use strict';

  var _private = {

    initMap: function() {
      console.log('init map');
    },

    init: function() {

    },
  };

  return {
    init: _private.init,
    initMap: _private.initMap
  };

}());
