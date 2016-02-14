import {Component, OnInit, EventEmitter} from 'angular2/core';

import {CartoDBService} from "../services/api/cartodb.service";

import 'rxjs/Rx';

@Component({
  selector: 'data-table',
  templateUrl: 'partials/data-table.component.html',
})
export class DataTableComponent implements OnInit {
    private year: number;
    private month: number;
    private type: string;
    public rows: Array<any>;

  constructor(private _cartoDBService: CartoDBService) {
  }

  ngOnInit() {
      this._cartoDBService.setType.subscribe((data: any) => {
          this.type = data;
          this.refreshDataTable();
      });

      this._cartoDBService.setMonth.subscribe((data: any) => {
          this.year = data.currentYear;
          this.month = data.currentMonth;
          this.refreshDataTable();
      });
  }

  refreshDataTable() {
      let sql = this._cartoDBService.getSQL(this.type, this.year, this.month)
      this._cartoDBService.getSQLResult(sql).map(
          data => data.json()
      ).subscribe(
          data =>  this.rows = this.groupData(data.rows)
      )
  }

  groupData(rows: Array<any>) : Array<any> {
      let result = {};

      rows.forEach((row) => {
          if(!result[row.status]) {
              result[row.status] = 0;
          }

          result[row.status] += 1;
      })

      return Object.keys(result).map(function(k) {
          return {
              "name": k,
              "value": result[k]
          }
      });
  }
}
