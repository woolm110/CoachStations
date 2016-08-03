/*global google */

var Imagination = Imagination || {};

Imagination.app = (function () {
  'use strict';

  var _private = {
    CONST: {
      location: {
        postcode: 'WC1E 7BL',
      },
      searchDistance: 3,
      endpoints: {
        coachStations: 'https://data.gov.uk/data/api/service/transport/naptan_coach_stations/postcode'
      },
    },
    globals: {
      markers: [],
      prevInfoWindow: false
    },

    /**
     * attachEventHandlers
     * attach click events to each station in the list
     */
    attachEventHandlers: function () {
      var els = document.getElementById('stations').getElementsByTagName('a');

      // create closure so we can access i
      function attachEvent(i) {
        els[i].addEventListener('click', function () {
          google.maps.event.trigger(_private.globals.markers[i], 'click');
        }, false);
      }

      // attach event to each station in list
      for (var i = 0; i < els.length; i++) {
        attachEvent(i);
      }
    },

    /**
     * getCoachLocations
     * retrieve coach stations based on location
     * @param  string postcode - location to focus search
     * @param  int distance - distace to focus search (KM)
     */
    getCoachLocations: function (postcode, distance) {
      Imagination.utils.getData(_private.CONST.endpoints.coachStations + '?distance=' + distance + '&postcode=' + postcode).then(function (res) {

          if (res.result.length) {
            _private.initMapAndPlotMarkers(res.result); // plot the markers onto a map
            _private.createCoachList(document.querySelectorAll('.content-stations')[0], res.result); // create a list of all coach locations
            _private.attachEventHandlers();
          } else {
            Imagination.utils.printMessageToEl('stations', 'No stations found. Please increase the search area.');
          }
        })
        .catch(function () {
          Imagination.utils.printMessageToEl('stations', 'An error occured. Please check the API endpoint is correct.');
        });
    },

    /**
     * initMapAndPlotMarkers
     * plot markers onto map canvas
     * @param  obj locations - markers to plot on map
     */
    initMapAndPlotMarkers: function (locations) {
      var bounds,
        map;

      bounds = new google.maps.LatLngBounds();

      map = new google.maps.Map(document.getElementById('map'));

      // lopp over and add markers 
      for (var i = 0; i < locations.length; i++) {
        var marker, position, infowindow, infoWindowContent;

        position = new google.maps.LatLng(locations[i].latlong.coordinates[1], locations[i].latlong.coordinates[0]);
        bounds.extend(position);

        marker = new google.maps.Marker({ position: position });
        _private.globals.markers[i] = marker;

        // automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
        marker.setMap(map);

        // attach click event to markers and bind name to info window
        infowindow = new google.maps.InfoWindow();
        infoWindowContent = locations[i].name;

        _private.attachMarkerEvent(marker, infoWindowContent, infowindow, map);
      }
    },

    /**
     * attachMarkerEvent
     * @param  object marker - marker to attach event to        
     * @param  string infoWindowContent - content to display in infowindow
     * @param  object infowindow - window to display info  
     * @param  object map
     * @return function                  
     */
    attachMarkerEvent: function (marker, infoWindowContent, infowindow, map) {
      google.maps.event.addListener(marker, 'click', (function (marker, infoWindowContent, infowindow) {
        return function () {

          // close any open info windows
          if (_private.globals.prevInfoWindow) {
            _private.globals.prevInfoWindow.close();
          }

          // store current info window
          _private.globals.prevInfoWindow = infowindow;

          infowindow.setContent(infoWindowContent);
          infowindow.open(map, marker);
        };
      })(marker, infoWindowContent, infowindow));
    },

    /**
     * createCoachList
     * create an HTML string of all coaches and append to page
     * @param  el - DOM element to attach list to
     * @param  object locations - list of coach locations
     */
    createCoachList: function (el, locations) {
      var html = '';

      for (var i = 0; i < locations.length; i++) {
        html += '<a href="javascript:void(0)" class="list-group-item template-station-name">' + locations[i].name + '</a>';
      }

      el.innerHTML = html;
    },

    /**
     * init
     * gets called on page load from init.js
     * @param  string postcode - postcode to use for lookup - optional
     * @param  int distance - radius to use for search - optional
     */
    init: function (postcode, distance) {
      var pc = postcode ? postcode : _private.CONST.location.postcode,
        d = distance ? distance : _private.CONST.searchDistance,
        formattedPostcode;

      if (Imagination.utils.isPostcodeValid(pc)) {
        // format postcode to include a space
        formattedPostcode = Imagination.utils.formatPostcode(pc);

        return _private.getCoachLocations(formattedPostcode, d);
      }

      // print error message
      Imagination.utils.printMessageToEl('stations', 'Please supply a valid UK postcode.');
    }
  };

  return {
    init: _private.init
  };

}());
