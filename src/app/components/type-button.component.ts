import {Component, OnInit, EventEmitter} from 'angular2/core';


@Component({
  selector: 'type-button',
	templateUrl: 'partials/type-button.component.html',
})
export class TypeButtonComponent implements OnInit {

  private selectedType: string;
  private showMenu: boolean;

  constructor() {
  }

  ngOnInit() {
    this.selectedType = 'Select One';
    this.showMenu = false;
  }

  toggleMenu() {
    console.log('toggling')
    this.showMenu = !this.showMenu;
  }

}
