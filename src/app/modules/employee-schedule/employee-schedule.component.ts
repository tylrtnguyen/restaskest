import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Schedule } from '../../models/schedule-data/schedule-data.model'
import * as moment from 'moment';
import { ScheduleService } from 'src/app/services/schedule.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-employee-schedule',
  templateUrl: './employee-schedule.component.html',
  styleUrls: ['./employee-schedule.component.css']
})
export class EmployeeScheduleComponent implements OnInit {

  date = moment().format('LLLL')
  dataSource: MatTableDataSource<Schedule>
  shiftList: any = []
  searchKey: string;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public service: ScheduleService,
              private notificationService: NotificationService) {
    this.fetchShift()
   }

  ngOnInit(): void {
  }

  
  displayedColumns = ['date', 'employeeName','start', 'stop', 'duration', 'expectedPay']

  fetchShift() {
    const userId = localStorage.getItem('userId')
    this.service.getShiftByEmployeeId(userId)
                        .subscribe((shifts: Schedule[]) => {
                          this.shiftList = shifts;
                          this.dataSource = new MatTableDataSource<Schedule>(this.shiftList.data as any);
                          this.dataSource.paginator = this.paginator;
                          this.dataSource.sort = this.sort;
                        })
  }


  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }


  onClose(){
    
  }


}
