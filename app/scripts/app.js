/*global google */

var Imagination = Imagination || {};

Imagination.app = (function() {
  'use strict';

  var _private = {
    CONST: {
      location: {
        postcode: 'WC1E 7BL',
      },
      markers: []
    },

    /**
     * attachEventHandlers
     * attach click events to each station in the list
     */
    attachEventHandlers: function() {
      var els = document.getElementById('stations').getElementsByTagName('a');

      // attach event to each station in list
      for (var i = 0; i < els.length; i++) {
        attachEvent(i);
      }

      // create closure so we can access i
      function attachEvent(i) {
        els[i].addEventListener('click', function() {
          google.maps.event.trigger(_private.CONST.markers[i], 'click');
        }, false);
      }
    },

    /**
     * getCoachLocations
     * retrieve coach stations based on location
     * @param  string postcode - location to focus search
     */
    getCoachLocations: function(postcode) {
      Imagination.utils.getData('https://data.gov.uk/data/api/service/transport/naptan_coach_stations/postcode?postcode=' + postcode + '&distance=3').then(function(res) {
        _private.initMapAndPlotMarkers(res.result); // plot the markers onto a map
        _private.createCoachList(document.querySelectorAll('.content-stations')[0], res.result); // create a list of all coach locations
        _private.attachEventHandlers();
      });
    },

    /**
     * initMapAndPlotMarkers
     * plot markers onto map canvas
     * @param  obj locations - markers to plot on map
     */
    initMapAndPlotMarkers: function(locations) {
      var mapOptions,
        bounds,
        myLatlng,
        map;

      bounds = new google.maps.LatLngBounds();

      // set center point to imagination office
      map = new google.maps.Map(document.getElementById('map'));

      // lopp over and add markers 
      for (var i = 0; i < locations.length; i++) {
        var marker, position, infowindow, infoWindowContent;

        position = new google.maps.LatLng(locations[i].latlong.coordinates[1], locations[i].latlong.coordinates[0]);
        bounds.extend(position);

        marker = new google.maps.Marker({ position: position });
        _private.CONST.markers[i] = marker;

        // automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
        marker.setMap(map);

        // attach click event to markers and bind name to info window
        infowindow = new google.maps.InfoWindow()
        infoWindowContent = locations[i].name;

        google.maps.event.addListener(marker, 'click', (function(marker, infoWindowContent, infowindow) {
          return function() {
            infowindow.setContent(infoWindowContent);
            infowindow.open(map, marker);
          };
        })(marker, infoWindowContent, infowindow));
      }
    },

    /**
     * createCoachList
     * @param  el - DOM element to attach list to
     * @param  obj locations - list of coach locations
     */
    createCoachList: function(el, locations) {
      var html = '';

      for (var i = 0; i < locations.length; i++) {
        html += '<li><a href="javascript:void(0);">' + locations[i].name + '</a></li>';
      }

      el.innerHTML = html;
    },

    /**
     * init
     * gets called on page load
     */
    init: function() {
      _private.getCoachLocations(_private.CONST.location.postcode);
    },
  };

  return {
    init: _private.init,
    markers: _private.CONST.markers
  };

}());
