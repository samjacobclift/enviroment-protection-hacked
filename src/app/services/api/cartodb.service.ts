import {Injectable, EventEmitter, Directive, HostListener, OnInit} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';


// Needed to process HTTP requests correctly
import 'rxjs/Rx';


@Injectable()
export class CartoDBService {
	refreshedTokenEvent = new EventEmitter();

	constructor(
        public _router: Router,
		public _http: Http
    ) {

	}

  getData() {
      var sql = new cartodb.SQL({ user: 'cartodb_user' });
      sql.execute("SELECT * FROM table_name WHERE id > {{id}}", { id: 3 })
        .done(function(data) {
          console.log(data.rows);
        })
        .error(function(errors) {
          // errors contains a list of errors
          console.log("errors:" + errors);
        })
  }
}
