import {Component, OnInit, EventEmitter} from 'angular2/core';
import {Routes} from '../config';
import {Router, RouteParams, Location, ROUTER_DIRECTIVES} from 'angular2/router';

import {TypeButtonComponent} from '../components/type-button.component';
import {DateRangeComponent} from '../components/date-range.component';
import {MapComponent} from '../components/map-component.component';
import {DataTableComponent} from '../components/data-table.component';

import {CartoDBService} from "../services/api/cartodb.service";

import 'rxjs/Rx';

const REPORT_LOOKUP = {
  'noise_complaint': 'Noise complaint',
  'light_pollution': 'Light pollution',
  'accumulations': 'Accumulations (including refuse & litter',
  'nuisance': 'Nuisance (excluding noise & pollution)',
  'drainage_complaint': 'Drainage Complaint',
  'odour': 'Odour/Fumes',
  'bonfires': 'Bonfires',
  'general_complaint': 'General (non-noise) complaint',
  'rat_complaint': 'Rat Complaint',
  'community_trigger': 'Community Trigger'
};

const REVERSE_REPORT_LOOKUP = {
  'Noise complaint': 'noise_complaint',
  'Light pollution': 'light_pollution',
  'Accumulations (including refuse & litter': 'accumulations',
  'Nuisance (excluding noise & pollution)': 'nuisance',
  'Drainage Complaint': 'drainage_complaint',
  'Odour/Fumes': 'odour',
  'Bonfires': 'bonfires',
  'General (non-noise) complaint': 'general_complaint',
  'Rat Complaint': 'rat_complaint',
  'Community Trigger': 'community_trigger'
};

@Component({
  selector: 'home',
	templateUrl: 'partials/home.component.html',
  directives: [
      ROUTER_DIRECTIVES,
      TypeButtonComponent,
      DateRangeComponent,
      MapComponent,
      DataTableComponent
 ]
})
export class HomeComponent implements OnInit {

  private typeParam:string;
  private monthParam:string;
  private yearParam:string;


  constructor(
    private _router: Router,
    private _routeParams: RouteParams,
    private _location: Location,
    private _cartoDBService: CartoDBService) {
  }

  ngOnInit() {
    // Take the loading of query params of the callstack
    this.extractSearchParams();

    // listen to events and update the service
    this._cartoDBService.setType.subscribe((type: string) => {
      // set the type from the lookup
      this.typeParam = REVERSE_REPORT_LOOKUP[type];
      this.setSearchParams();
    });

    this._cartoDBService.setDate.subscribe((date: any) => {
      this.yearParam = date['currentYear'];
      this.monthParam = date['currentMonth'];
      this.setSearchParams();
    });

  }

  extractSearchParams() {
    let searchParams = {}
    if (this._routeParams.get('type')) {
      this.typeParam = REPORT_LOOKUP[this._routeParams.get('type')];
      searchParams['type'] = this.typeParam;
    }

    if (this._routeParams.get('month')) {
      this.monthParam = this._routeParams.get('month');
      searchParams['month'] = this.monthParam;
    }

    if (this._routeParams.get('year')) {
      this.yearParam = this._routeParams.get('year');
      searchParams['year'] = this.yearParam;
    }
    // set search params
    setTimeout(() => {
      console.log('emitting')
      console.log(searchParams)
      console.log(this._cartoDBService.setSearch.emit)
      this._cartoDBService.setSearch.emit(searchParams);
    }, 500)
  }

  /** Set state params */
  setSearchParams() {
    let queryString = '';

    if (this.yearParam || this.typeParam) {
      queryString = '/?'
    }

    if (this.yearParam && this.monthParam) {
      queryString = queryString + 'year=' + this.yearParam;
      queryString = queryString + '&month=' + this.monthParam;
    }

    if (this.typeParam) {
      if (this.yearParam) {
        queryString = queryString + '&'
      }
      queryString = queryString + 'type=' + this.typeParam;
    }
    this._location.go(queryString);
  }

}
