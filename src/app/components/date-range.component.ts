import {Component, OnInit, EventEmitter} from 'angular2/core';

import {CartoDBService} from "../services/api/cartodb.service";


@Component({
  selector: 'date-range',
	templateUrl: 'partials/date-range.component.html',
})
export class DateRangeComponent implements OnInit {

  private currentViewDate:Date;
  private lastMonth:Date;
  private nextMonth:Date;
  private filterActive:boolean;


  constructor(private _cartoDBService: CartoDBService) {
  }

  ngOnInit() {
    // When loading set to current date
    this.currentViewDate = new Date();
    this.setDateSearchString();

    // set to no filter when page loads
    this.filterActive = false;

  }

  setDateSearchString() {
    let month = this.currentViewDate.getMonth();
    let year = this.currentViewDate.getFullYear()

    this.lastMonth = new Date(year, month, 1);
    this.lastMonth.setMonth(this.lastMonth.getMonth() - 1);

    this.nextMonth = new Date(year, month, 1);
    this.nextMonth.setMonth(this.lastMonth.getMonth() + 2);


  }

  /**
  Reset to show all data
  */
  reset() {
    this.currentViewDate = new Date();

    this.setDateSearchString();

    this._cartoDBService.setMonth.emit({'currentYear': '',
                                        'currentMonth': ''});
    // set to no filter when page loads
    this.filterActive = false;

  }

  /**
  Page to the previous month
  */
  filterPreviousMonth() {
    // work out the previous month
    this.currentViewDate.setMonth(this.currentViewDate.getMonth() - 1);

    let currentYear = this.currentViewDate.getFullYear();
    let currentMonth = this.currentViewDate.getMonth() + 1;

    this.setDateSearchString();

    this._cartoDBService.setMonth.emit({'currentYear':currentYear,
                                        'currentMonth': currentMonth});

    this.filterActive = true;

  }

  /**
  Page to the previous month
  */
  filterNextMonth() {
    // work out the previous month
    this.currentViewDate.setMonth(this.currentViewDate.getMonth() + 1);
    let currentYear = this.currentViewDate.getFullYear();
    let currentMonth = this.currentViewDate.getMonth() + 1;

    this.setDateSearchString();

    this._cartoDBService.setMonth.emit({'currentYear':currentYear,
                                        'currentMonth': currentMonth});

    this.filterActive = true;

  }


}
