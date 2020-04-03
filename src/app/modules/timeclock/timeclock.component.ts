import { Component, OnInit, ViewChild } from '@angular/core';
// Material utilities import
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Timeclock } from '../../models/timeclock-data/timeclock-data.model'
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';
import { TimeclockService } from 'src/app/services/timeclock.service';


// Transaction interface

@Component({
  selector: 'app-timeclock',
  templateUrl: './timeclock.component.html',
  styleUrls: ['./timeclock.component.css']
})
export class TimeclockComponent implements OnInit {

  dataSource: MatTableDataSource<Timeclock>
  workHourReport: any = []
  date = moment().format('LLLL')
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private excelService: ExcelService,
              public service: TimeclockService) { }

  ngOnInit(): void {
  }

  displayedColumns = ['employeeName', 'employeeWages', 'totalWorkHours']

  fetchReport(dateObj) {
    this.service.getWorkHourReport(dateObj)
                        .subscribe((workHourReport: Timeclock[]) => {
                          this.workHourReport = workHourReport['data'];
                          this.dataSource = new MatTableDataSource<Timeclock>(this.workHourReport as any);
                          this.dataSource.paginator = this.paginator;
                          this.dataSource.sort = this.sort;
                        }, error => {
                          console.log(error)
                        })
  }


  onSubmit(){
    if(this.service.formControl.valid){
      this.fetchReport(this.service.formControl.value);
    }
  }

  onClear(){
    this.service.formControl.reset();
    this.service.initializeFormGroup();
  }
  

  /** Gets the total wages of all transactions. */
  getTotalCost() {
    return this.workHourReport.map(t => t.employeeWages * t.totalWorkHours).reduce((acc, value) => acc + value, 0);
  }

  exportAsXLSX(): void {
    let now = moment();
    const dateTime = now.format('YYYY-MM-DD:HH:ss')
    this.excelService.exportAsExcelFile(this.workHourReport, `timeclock${dateTime}`);
  }
  
}
