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
    this.selectedType = 'All';

    this._cartoDBService.setSearch.subscribe((data: string) => {
      console.log('setting type in btn comp ', data)
      if (data['type']) {
        this.selectedType = data['type'];
      }
    });


    this.showMenu = false;
    // load the report types
    this.reportTypes = [
      'Noise complaint',
      'Light pollution',
    //   'Accumulations (including refuse & litter',
    //   'Nuisance (excluding noise & pollution)',
      'Drainage Complaint',
      'Odour/Fumes',
      'Bonfires',
      'General (non-noise) complaint',
      'Rat Complaint',
      'Community Trigger'
    ]
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  // Set and store the type
  selectType(type:string) {
    this.selectedType = type;
    this.showMenu = false;
    this._cartoDBService.setType.emit(this.selectedType);
  }

  // reset
  resetTypes() {
    this.selectedType = 'All';
    this.showMenu = false;
    this._cartoDBService.setType.emit(null);
  }

}
