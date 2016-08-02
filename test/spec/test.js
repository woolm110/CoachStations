/*global chai, describe:false, before:false, it: false, */
'use strict';

var expect = chai.expect;
var Imagination = Imagination || {};

describe('Coach Stations', function () {
  describe('data', function () {
    describe('promise to return an object', function () {
      var data;

      before(function (done) {
        data = Imagination.utils.getData('https://data.gov.uk/data/api/service/transport/naptan_coach_stations/postcode?distance=3&postcode=WC1E%207BL')
          .then(function (res) {
            data = res;
            done();
          })
          .catch(function () {
            done();
          });
      });

      it('should return a json object', function () {
        expect(data).to.be.an('object');
      });
    });
  });

  describe('postcode', function () {
    describe('invalid postcode', function () {
      it('should return false to indicate postcode is invalid', function () {
        var isValid = Imagination.utils.isPostcodeValid('fsffsaf');
        expect(isValid).to.equal(false);
      });
    });

    describe('valid postcode', function () {
      it('should return true to indicate postcode is valid', function () {
        var isValid = Imagination.utils.isPostcodeValid('WC1V7BD');
        expect(isValid).to.equal(true);
      });
    });
  });
});
