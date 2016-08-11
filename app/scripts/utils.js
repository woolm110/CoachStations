var CoachStations = CoachStations || {};

CoachStations.utils = (function () {
  'use strict';

  return {

    /**
     * getData
     * get data from url using fetch api
     * @param  string url - api endpoint
     * @return mixed
     */
    getData: function (url) {
      // catch any errors
      function errorHandler(response) {
        if (!response.ok) {
          if (response.status === 500 || response.status === 404) {
            throw Error(response.statusText + '. Please check the endpoint is correct');
          } else {
            throw Error(response.statusText);
          }
        }

        return response;
      }

      return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET'
          })
          .then(errorHandler)
          .then(function (response) {
            return response.json().then(function (json) {
              resolve(json);
            });
          }).catch(function (error) {
            reject(error);
          });
      });
    },

    /**
     * isPostcodeValid
     * check postcode matches UK format
     * @param  string postcode 
     * @return bool
     */
    isPostcodeValid: function (postcode) {
      var regex;

      regex = /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i;

      return regex.test(postcode.toLowerCase());
    },

    /**
     * formatPostcode
     * format postcode to include a space
     * @param  string postcode - postcode to format
     * @return string - formatted postcode include space
     */
    formatPostcode: function (postcode) {
      var parts;

      parts = postcode.toUpperCase().match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/);
      parts.shift();

      return parts.join(' ');
    },

    /**
     * printMessageToEl
     * print a message inside a DOM element
     * @param  object el  - element to attach msg to
     * @param  string msg - message to show
     */
    printMessageToEl: function (el, msg) {
      document.getElementById(el).innerText = msg;
    }
  };
}());
