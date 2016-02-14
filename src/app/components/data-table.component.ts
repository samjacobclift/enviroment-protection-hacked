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
    public allRows: Array<any> = [];

  constructor(private _cartoDBService: CartoDBService) {
  }

  ngOnInit() {
      this._cartoDBService.setType.subscribe((data: any) => {
          this.type = data;
          this.refreshDataTable();
      });

      this._cartoDBService.setDate.subscribe((data: any) => {
          this.year = data.currentYear;
          this.month = data.currentMonth;
          this.refreshDataTable();
      });

      this._cartoDBService.setSearch.subscribe((data: any) => {
        this.year = data['currentYear'];
        this.month = data['currentMonth'];
        this.type = data['type'];
        this.refreshDataTable();
      });
  }

  refreshDataTable() {
      let allRowsPromise = new Promise((resolve, reject) => {
          console.log("XXXX");
          let sql = this._cartoDBService.getSQL(null, null, null);

          this._cartoDBService.getSQLResult(sql).map(
              data => data.json()
          ).subscribe(
              data =>  resolve(this.groupData(data.rows, false))
          )
      });

      if(this.allRows.length === 0) {
          allRowsPromise.then((data) => {
              this.allRows = data;

              let sql = this._cartoDBService.getSQL(this.type, this.year, this.month)
              this._cartoDBService.getSQLResult(sql).map(
                  data => data.json()
              ).subscribe(
                  data => this.rows = this.formatGroup(this.groupData(data.rows))
              )
          });
      } else {
          let sql = this._cartoDBService.getSQL(this.type, this.year, this.month)
          this._cartoDBService.getSQLResult(sql).map(
              data => data.json()
          ).subscribe(
              data => this.rows = this.formatGroup(this.groupData(data.rows))
          )
      }
  }

  groupData(rows: Array<any>) : Array<any> {
      let result = {};

      rows.forEach((row) => {
          if(!result[row.type]) {
              result[row.type] = 0;
          }

          result[row.type] += 1;
      });

      return result;
  }

  formatGroup(rows: Array<any>) : Array<any> {
      return Object.keys(rows).map((k) => {
          let avg = this.allRows[k] / 13;
          let res = {
              "name": k,
              "value": rows[k],
              "alltime": this.allRows[k],
              "avg": Math.round(avg, 0),
              "againstavg": -Math.round((((avg - rows[k]) / avg) * 100))
          }

          return res;
      }).sort(function(a, b) {
          return b.name.length - a.name.length;
      });
  }
}
