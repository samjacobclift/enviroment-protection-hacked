import {Injectable, EventEmitter, Directive, HostListener, OnInit} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';
import {DatePipe} from 'angular2/common';


// Needed to process HTTP requests correctly
import 'rxjs/Rx';


@Injectable()
export class CartoDBService {
	setType = new EventEmitter();
	setDate = new EventEmitter();
	setSearch = new EventEmitter();
	queryUpdated = new EventEmitter();
	baseQuery = 'SELECT * FROM banes_environmental_protection_service_requestsv2 ';


	constructor(private _http: Http) {
	}

	getSQL(type: string, year: string, month: string) : string {
		if(type) {
			type = type.replace("(", "\(");
			type = type.replace("\)", ")");
		}
		let query = this.baseQuery;

	    if (type || year) {
	      query += " WHERE ";
	    }

	    if (type) {
	      query += ` type = '${type}'`;
	    }

	    if (year) {
	      // 2015-07 '))
	      if (type) {
	        query += " AND "
	      }
		  let dateFilter = new Date();
		  dateFilter.setFullYear(year);
		  dateFilter.setMonth(month);
		  dateFilter.setDate(1);

		  let startDate = dateFilter.getFullYear() + "-" + this.padMonth(dateFilter.getMonth() + 1);
		  dateFilter.setMonth(dateFilter.getMonth() + 1);
		  let endDate = dateFilter.getFullYear() + "-" + this.padMonth(dateFilter.getMonth() + 1);
	      query += " receiveddate >= '" + startDate + "-01T00:00:00' AND receiveddate < '" + endDate + "-01T00:00:00'";
		  console.log(query);
	    }

		return query;
	}

	padMonth(m: number) : string {
		let s =  m + "";
		if(s.length == 1) {
			return "0" + m;
		}

		return m;
	}

	getSQLResult(sql: string) : any {
		const APIKEY = "59f08e1c8d3bd54c48b73f4d415d2c4b4286e674";
		return this._http.get(`https://philknight.cartodb.com/api/v2/sql?api_key=${APIKEY}&q=${sql}`)
	}
}
