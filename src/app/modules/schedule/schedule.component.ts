import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Schedule } from '../../models/schedule-data/schedule-data.model'
import * as moment from 'moment';
import { ScheduleService } from 'src/app/services/schedule.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { AddShiftDialogComponent } from './add-shift-dialog/add-shift-dialog.component'
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  date = moment().format('LLLL')
  dataSource: MatTableDataSource<Schedule>
  shiftList: any = []
  searchKey: string;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public service: ScheduleService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private notificationService: NotificationService) {
    this.fetchShift()
   }

  ngOnInit(): void {
  }

  
  displayedColumns = ['date', 'employeeName','start', 'stop', 'duration', 'expectedPay', 'actions']

  fetchShift() {
    this.service.getAllShifts()
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

  onAddShift(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%"
    this.dialog.open(AddShiftDialogComponent, dialogConfig);
  }

  onUpdate(row){
    // Destructuring to get necessary for schedule
    let {employeeName, wages, ...schedule} = row;
    this.service.populateForm(schedule);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%"
    this.dialog.open(AddShiftDialogComponent, dialogConfig);
  }

  onDelete(id){
    console.log(id)
    this.dialogService.openDialog('Are you sure to delete this shift?')
                      .afterClosed().subscribe(res => {
                        if(res){
                          this.service.deleteShift(id).subscribe(data => {
                            console.log(data)
                          })
                          this.notificationService.warn('Successfully deleted shift')
                        }
                        
                      })
  }

  onClose(){
    
  }

}
