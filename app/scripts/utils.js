/*global Request, Headers */

var Imagination = Imagination || {};

Imagination.utils = (function() {
  'use strict';

  return {

    /**
     * getData
     * get data from url using fetch api
     * @param  string url - api endpoint
     * @param  function successCb - callback to fire if successfull
     * @param  function errorCb - callback to fire if unsuccessful
     * @return mixed
     */
    getData: function(url, successCb, errorCb) {
      var req = new Request(url, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });

      fetch(req)
        .then(errorHandler)
        .then(function(response) {
          return response.json().then(function(json) {
            // if successful fire custom callback
            if (typeof errorCb == 'function') {
              return successCb(json);
            }
          });
        }).catch(function(error) {
          // if error fire custom callback
          if (typeof errorCb == 'function') {
            return errorCb(error);
          }
        });

      // catch any errors
      function errorHandler(response) {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response;
      }
    },

    /**
     * addClass
     * custom helper to add a class to an element
     * @param  el - element to add class to
     * @param string className - class to add to the element
     */
    addClass: function(el, className) {
      if (el.classList) {
        el.classList.add(className)
      } else if (!hasClass(el, className)) {
        el.className += ' ' + className;
      }
    },

    /**
     * removeClass
     * custom helper to remove a class from an element
     * @param  el - element to remove class from
     * @param string className - class to remove from the element
     */
    removeClass: function(el, className) {
      if (el.classList) {
        el.classList.remove(className);
      } else {
        el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
      }
    },

    init: function() {
      console.log('utils init');
    },
  };
}());
