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
    getData: function(url) {
      return new Promise(function(resolve, reject) {
        fetch(url, {
            method: 'GET'
          })
          .then(errorHandler)
          .then(function(response) {
            return response.json().then(function(json) {
              resolve(json);
            });
          }).catch(function(error) {
            reject(error);
          });
      });

      // catch any errors
      function errorHandler(response) {
        if (!response.ok) {
          if (response.status === 500 || response.status === 404) {
            throw Error(response.statusText + '. Please check the endpoint is correct')
          } else {
            throw Error(response.statusText);
          }
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
  };
}());
