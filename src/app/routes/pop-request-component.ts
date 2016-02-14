import {Component, OnInit, EventEmitter} from 'angular2/core';
import {Routes} from '../config';
import {Router, RouteParams, Location, ROUTER_DIRECTIVES} from 'angular2/router';

import {CartoDBService} from "../services/api/cartodb.service";

import 'rxjs/Rx';

@Component({
    selector: 'intro',
	templateUrl: 'partials/pop-request.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class PopRequestRouteComponent implements OnInit {

  ngOnInit() {
    cartodb.createVis('pop_request',
                      'https://philknight.cartodb.com/api/v2/viz/8f74e552-d304-11e5-8862-0ea31932ec1d/viz.json');
  }
}
