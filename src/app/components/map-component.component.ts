import {Component, OnInit, EventEmitter} from 'angular2/core';

import {CartoDBService} from "../services/api/cartodb.service";

@Component({
    selector: 'map-component',
	templateUrl: 'partials/map.component.html',
})
export class MapComponent implements OnInit {
    private _map: any;

  constructor(private _cartoDBService: CartoDBService) {

  }

  ngOnInit() {

        // initiate leaflet map
        map = new L.Map('map_canvas', {
          center: [51.381481, -2.3586],
          zoom: 12
        })

        L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
          attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
        }).addTo(map);

        var layerUrl = 'https://philknight.cartodb.com/api/v2/viz/62dd0b5c-d25d-11e5-a592-0e3ff518bd15/viz.json';

        // change the query for the first layer
        var subLayerOptions = {
          sql: "SELECT * FROM banes_environmental_protection_service_requestsv2",
          cartocss: "#banes_environmental_protection_service_requestsv2{marker-fill: #109DCD; marker-width: 5; marker-line-color: white; marker-line-width: 0;}"
        }

        cartodb.createLayer(map, layerUrl)
          .addTo(map)
          .on('done', function(layer) {
            layer.getSubLayer(0).set(subLayerOptions);
          }).on('error', function() {
            //log the error
          });

  }


}
