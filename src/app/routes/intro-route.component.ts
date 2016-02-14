import {Component, OnInit, EventEmitter} from 'angular2/core';
import {Routes} from '../config';
import {Router, RouteParams, Location, ROUTER_DIRECTIVES} from 'angular2/router';

import {CartoDBService} from "../services/api/cartodb.service";

import 'rxjs/Rx';

@Component({
    selector: 'intro',
	templateUrl: 'partials/intro.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class IntroRouteComponent {
}
