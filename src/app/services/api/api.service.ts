import {Injectable, EventEmitter, Directive, HostListener, OnInit} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';


// Needed to process HTTP requests correctly
import 'rxjs/Rx';


@Injectable()
export class ApiService {
	localCredsKey = 'creds';
  creds = '';
	oauthUrl = '';
	apiUrl = '';

	refreshedTokenEvent = new EventEmitter();

	constructor(public _router: Router,
							public _http: Http) {

	}

  /** Determines if user is authenticated */
  isAuthenticated() {
  }
}
