import {Injectable, EventEmitter, Directive, HostListener, OnInit} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';
import {DatePipe} from 'angular2/common';


// Needed to process HTTP requests correctly
import 'rxjs/Rx';


@Injectable()
export class CartoDBService {
	setType = new EventEmitter();
	setDateRange = new EventEmitter();

}
