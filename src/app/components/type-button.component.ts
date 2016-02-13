import {Component, OnInit, EventEmitter} from 'angular2/core';

import {CartoDBService} from "../services/api/cartodb.service";


@Component({
  selector: 'type-button',
	templateUrl: 'partials/type-button.component.html',
})
export class TypeButtonComponent implements OnInit {

  private selectedType: string;
  private showMenu: boolean;

  private reportTypes:Array<string>

  constructor(private _cartoDBService: CartoDBService) {
  }

  ngOnInit() {
    this.selectedType = 'Select One';
    this.showMenu = false;
    // load the report types
    this.reportTypes = [
      'Noise complaint',
      'Light pollution',
      'Accumulations (including refuse & litter)',
      'Nuisance (excluding noise & pollution)',
      'Drainage Complaint',
      'Odour/Fumes',
      'Bonfires',
      'General (non-noise) complaint',
      'Rat Complaint'
    ]
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  // Set and store the type
  selectType(type:string) {
    this.selectedType = type;
    this.showMenu = false;
    let query = "SELECT * FROM banes_environmental_protection_service_requestsv2 WHERE type IN ('" + this.selectedType + "') AND type IS NOT NULL"
    this._cartoDBService.updateQuery.emit(query);
  }

  // reset
  resetTypes() {
    let query = "SELECT * FROM banes_environmental_protection_service_requestsv2"
    this._cartoDBService.updateQuery.emit(query);
  }

}
