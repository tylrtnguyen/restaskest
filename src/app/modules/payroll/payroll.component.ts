import { Component, OnInit, ViewChild } from '@angular/core';
// Material utilities import
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// Model import
import { PayrollData } from '../../models/payroll-data/payroll-data';
// Service import
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { PayrollService } from 'src/app/services/payroll.service';
import { PayrollDialogComponent } from './payroll-dialog/payroll-dialog.component';
import { SendtoDialogComponent } from './sendto-dialog/sendto-dialog.component';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

  searchKey: string;
  columns_to_display: string[] =['employee_id', 'file_title', 'file_URL', 'uploaded_at', 'send_to'];
  payrollList: any = [];
  dataSource: MatTableDataSource<PayrollData>
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private payrollService: PayrollService,
              private notificationService: NotificationService,
              private dialog: MatDialog) {
                this.fetchPayroll();
              }

  ngOnInit(): void {
  }

  fetchPayroll(){
    this.payrollService.getFiles()
                                .subscribe((employees: PayrollData[]) => {
                                  this.payrollList = employees;
                                  this.dataSource = new MatTableDataSource<PayrollData>(this.payrollList.data as any);
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

  sendTo(row) {
    const {__v, ...payroll } = row;
    const updatePayroll = {
      _id: payroll._id,
      file_title: payroll.file_title,
      file_URL: payroll.file_URL,
      uploaded_at: payroll.uploaded_at,
      employee_id: payroll.employee_id || 0,
    }
    this.payrollService.populateForm(updatePayroll);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%"
    this.dialog.open(SendtoDialogComponent, dialogConfig);
  }
  
  onUpdate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%"
    this.dialog.open(PayrollDialogComponent, dialogConfig);
  }




}
