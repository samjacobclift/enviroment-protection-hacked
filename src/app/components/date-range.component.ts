import {Component, OnInit, EventEmitter} from 'angular2/core';

import {CartoDBService} from "../services/api/cartodb.service";


@Component({
  selector: 'date-range',
	templateUrl: 'partials/date-range.component.html',
})
export class DateRangeComponent implements OnInit {

  private currentViewDate:Date;

  constructor(private _cartoDBService: CartoDBService) {
  }

  ngOnInit() {
    // When loading set to current date
    this.currentViewDate = new Date();
  }

  /**
  Page to the previous month
  */
  previousMonth() {
    // start date
    let startMonth = this.currentViewDate.getMonth() - 1;

    // end date
    this._cartoDBService.setDateRange.emit('');

  }



}
