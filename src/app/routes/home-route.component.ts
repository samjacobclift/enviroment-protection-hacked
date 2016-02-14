import {Component, OnInit, EventEmitter} from 'angular2/core';
import {Routes} from '../config';
import {Router, RouteParams, Location, ROUTER_DIRECTIVES} from 'angular2/router';

import {TypeButtonComponent} from '../components/type-button.component';
import {DateRangeComponent} from '../components/date-range.component';
import {MapComponent} from '../components/map-component.component';
import {DataTableComponent} from '../components/data-table.component';

// Needed to process HTTP requests correctly
import 'rxjs/Rx';

@Component({
  selector: 'home',
	templateUrl: 'partials/home.component.html',
  directives: [
      ROUTER_DIRECTIVES,
      TypeButtonComponent,
      DateRangeComponent,
      MapComponent,
      DataTableComponent
 ]
})
export class HomeComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit() {

  }

}
