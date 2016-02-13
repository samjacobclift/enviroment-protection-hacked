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

      cartodb.createVis('map', 'https://philknight.cartodb.com/api/v2/viz/62dd0b5c-d25d-11e5-a592-0e3ff518bd15/viz.json');
      // cartodb.createLayer('map', {
      //   user_name: 'philknight',
      //   type: 'cartodb',
      //   sublayers: [{
      //     sql: "SELECT * FROM banes_environmental_protection_service_requestsv2 WHERE ST_Distance(the_geom, ST_SetSRID(ST_MakePoint(-2.368147, 51.392624),4326), true) < 500",
      //     cartocss: '#banes_environmental_protection_service_requestsv2 {marker-fill-opacity: 0.9; marker-line-color: blue; marker-line-width: 1; marker-line-opacity: 1; marker-placement: point; marker-type: ellipse; marker-width: 10; marker-fill: #FF6600;marker-allow-overlap: true;}'
      //   }]
      // })
      // .addTo('map');
      // var sql = new cartodb.SQL({ user: 'philknight' });
      // sql.execute("SELECT * FROM banes_environmental_protection_service_requestsv2",)
      //   .done(function(data) {
      //     console.log(data.rows);
      //   })
      //   .error(function(errors) {
      //     // errors contains a list of errors
      //     console.log("errors:" + errors);
      //   })
  }

  // addDataToMap(data: any) {
  //     data.rows.forEach((row: any) => {
  //
  //     });
  // }

}
