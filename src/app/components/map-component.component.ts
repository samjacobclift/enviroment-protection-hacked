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
      console.log("ngOnInit");

    //   this._cartoDBService.getData(new Date(2016, 1, 1), new Date()).map(
    //       res => res.json()
    //   ).subscribe(
    //       data => this.addDataToMap(data)
    //   );

      this._map = new L.Map('map', {
        zoomControl: false,
        center: [43, 0],
        zoom: 3
      });
      console.log(this._cartoDBService.getSQL(new Date(2016, 1, 1), new Date()));
      cartodb.createLayer(this._map, {
        user_name: 'philknight',
        type: 'cartodb',
        sublayers: [{
          sql: this._cartoDBService.getSQL(new Date(2016, 1, 1), new Date()),
          cartocss: '#table_name {marker-fill: #F0F0F0;}'
        }]
      })
      .addTo(this._map)
  }

  // addDataToMap(data: any) {
  //     data.rows.forEach((row: any) => {
  //
  //     });
  // }

}
