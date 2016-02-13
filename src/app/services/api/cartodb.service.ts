import {Injectable, EventEmitter, Directive, HostListener, OnInit} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';
import {DatePipe} from 'angular2/common';


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

  getSQL(startDate: Date, endDate: Date) {
      let APIKEY = "59f08e1c8d3bd54c48b73f4d415d2c4b4286e674";
      let dp = new DatePipe();
      let fmtStartDate = dp.transform(startDate, ["yyyy-MM-dd"]);
      let fmtEndDate = dp.transform(endDate, ["yyyy-MM-dd"]);
      return `https://philknight.cartodb.com/api/v2/sql?api_key=${APIKEY}&q=SELECT * FROM banes_environmental_protection_service_requestsv2 WHERE closeddate BETWEEN '${fmtStartDate}' AND '${fmtEndDate}'`;
  }
}
