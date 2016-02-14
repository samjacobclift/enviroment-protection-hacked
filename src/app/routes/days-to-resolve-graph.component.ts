import {Component, OnInit, EventEmitter} from 'angular2/core';
import {Routes} from '../config';
import {Router, RouteParams, Location, ROUTER_DIRECTIVES} from 'angular2/router';

import {CartoDBService} from "../services/api/cartodb.service";

import 'rxjs/Rx';

@Component({
    selector: 'intro',
	templateUrl: 'partials/days-to-resolve.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class DaysToResolveRouteComponent implements OnInit {

  ngOnInit() {
    cartodb.createVis('days_to_resolve_vis',
                      'https://philknight.cartodb.com/api/v2/viz/0a7faa40-d2ea-11e5-81c9-0e5db1731f59/viz.json');
  }
}
