var Imagination = Imagination || {};

Imagination.utils = (function () {
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
  };
}());
