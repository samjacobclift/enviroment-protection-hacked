import {Component, OnInit, EventEmitter} from 'angular2/core';

import {CartoDBService} from "../services/api/cartodb.service";


@Component({
  selector: 'date-range',
	templateUrl: 'partials/date-range.component.html',
})
export class DateRangeComponent implements OnInit {

  private currentViewDate:Date;
  private currentDateSearchParams:string;


  constructor(private _cartoDBService: CartoDBService) {
  }

  ngOnInit() {
    // When loading set to current date
    this.currentViewDate = new Date();
    this.setDateSearchString();
  }

  setDateSearchString() {
    let month = (this.currentViewDate.getMonth() + 1);
    let year = this.currentViewDate.getFullYear()
    this.currentDateSearchParams =  year + '-' + month
  }
  /**
  Page to the previous month
  */
  previousMonth() {
    // work out the previous month
    this.currentViewDate.setMonth(this.currentViewDate.getMonth() - 1);

    let currentYear = this.currentViewDate.getFullYear();
    let currentMonth = this.currentViewDate.getMonth() + 1;

    this.setDateSearchString();

    this._cartoDBService.setMonth.emit({'currentYear':currentYear,
                                        'currentMonth': currentMonth});

  }



}
