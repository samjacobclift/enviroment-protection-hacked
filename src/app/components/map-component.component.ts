import {Component, OnInit, EventEmitter} from 'angular2/core';

import {CartoDBService} from "../services/api/cartodb.service";

@Component({
    selector: 'map-component',
	templateUrl: 'partials/map.component.html',
})
export class MapComponent implements OnInit {
  private _map:any;
  private layer:any;
  private layerURL:string;
  private titleLayerURL:string;
  private baseQuery:string;
  private type:string;

  constructor(private _cartoDBService: CartoDBService) {
  }

  ngOnInit() {
    this.baseQuery = 'SELECT * FROM banes_environmental_protection_service_requestsv2 ';
    this._cartoDBService.setType.subscribe((type: string) => {
      this.setType(type);
    });

    this.layerURL = 'https://philknight.cartodb.com/api/v2/viz/62dd0b5c-d25d-11e5-a592-0e3ff518bd15/viz.json';
    this.titleLayerURL = 'https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png'
    // initiate leaflet map
    this._map = new L.Map('map_canvas', {
      center: [51.381481, -2.3586],
      zoom: 12
    })

    L.tileLayer(this.titleLayerURL, {
      attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
    }).addTo(this._map);

    this.setQuery();
  }

  setType(typeToQuery:string) {
    this.type = typeToQuery;
    this.setQuery();
  }

  setQuery() {
    let query = this.baseQuery;

    if (this.type) {
        query += "WHERE type IN ('" + this.type + "') AND type IS NOT NULL";
    }
    console.log(query);

    this._map.eachLayer((layer:any) => {
      if (layer['_url'] != this.titleLayerURL) {
        this._map.removeLayer(layer);
      }
    })

    // change the query for the first layer
    let subLayerOptions = {
      sql: query,
      cartocss: "#banes_environmental_protection_service_requestsv2{marker-fill: #109DCD; marker-width: 5; marker-line-color: white; marker-line-width: 0;}"
    }

    cartodb.createLayer(this._map, this.layerURL)
     .addTo(this._map)
     .on('done', function(layer: any) {
       layer.getSubLayer(0).set(subLayerOptions);
     }).on('error', function() {
       //log the error
     });
   }

}
