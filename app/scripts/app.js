var Imagination = Imagination || {};

Imagination.app = (function() {
  'use strict';

  var _private = {
    CONST: {
      location: {
        postcode: 'WC1E 7BL',
        lat: 51.51937,
        lng: -0.13186029999997118
      }
    },

    /**
     * getCoachLocationsAndPlotOnMap
     * retrieve coach stations based on location
     * @param  string postcode - location to focus search
     */
    getCoachLocationsAndPlotOnMap: function(postcode) {
      Imagination.utils.getData('https://data.gov.uk/data/api/service/transport/naptan_coach_stations/postcode?postcode=' + postcode + '&distance=3').then(function(res) {
        _private.initMapAndPlotMarkers(res.result);
      });
    },

    /**
     * initMapAndPlotMarkers
     * plot markers onto map canvas
     * @param  obj markers - markers to plot on map
     */
    initMapAndPlotMarkers: function(markers) {
      var mapOptions,
        bounds,
        myLatlng,
        map;

      bounds = new google.maps.LatLngBounds();

      // set center point to imagination office
      map = new google.maps.Map(document.getElementById('map'));

      // lopp over and add markers 
      for (var i = 0; i < markers.length; i++) {
        var marker, position;

        position = new google.maps.LatLng(markers[i].latlong.coordinates[1], markers[i].latlong.coordinates[0]);
        bounds.extend(position);

        marker = new google.maps.Marker({ position: position });

        // automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
        marker.setMap(map);
      }
    },

    /**
     * init
     * gets called on page load
     */
    init: function() {
      _private.getCoachLocationsAndPlotOnMap(_private.CONST.location.postcode);
    },
  };

  return {
    init: _private.init,
    initMapAndPlotMarkers: _private.initMapAndPlotMarkers
  };

}());
