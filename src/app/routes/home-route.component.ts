import {Component, OnInit, EventEmitter} from 'angular2/core';
import {Routes} from '../config';
import {Router, RouteParams, Location, ROUTER_DIRECTIVES} from 'angular2/router';

import {CartoDBService} from '../services/api/cartodb.service';
import {ApiService} from '../services/api/api.service';
import {TypeButtonComponent} from '../components/type-button.component';
import {DateRangeComponent} from '../components/date-range.component';

// Needed to process HTTP requests correctly
import 'rxjs/Rx';

@Component({
  selector: 'home',
	templateUrl: 'partials/home.component.html',
  directives: [ROUTER_DIRECTIVES,
               TypeButtonComponent,
               DateRangeComponent]
})
export class HomeComponent implements OnInit {
  public routes = Routes;
  private accessToken: string;

  /** Observable Events */
  // keywordSearchObserver = new EventEmitter();
  constructor(
      public _cartoDBService: CartoDBService
  ) {
      _cartoDBService.getData();
  }

  ngOnInit() {

  }

}
