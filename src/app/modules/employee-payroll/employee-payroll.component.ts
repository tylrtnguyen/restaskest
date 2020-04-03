import { Component, OnInit, ViewChild } from '@angular/core';
// Material utilities import
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// Model import
import { PayrollData } from '../../models/payroll-data/payroll-data';
// Service import
import { NotificationService } from 'src/app/services/notification.service';
import { PayrollService } from 'src/app/services/payroll.service';

@Component({
  selector: 'app-employee-payroll',
  templateUrl: './employee-payroll.component.html',
  styleUrls: ['./employee-payroll.component.css']
})
export class EmployeePayrollComponent implements OnInit {

  columns_to_display: string[] =['employee_id', 'file_title', 'file_URL', 'uploaded_at', 'save'];
  searchKey: string;
  payrollList: any = [];
  dataSource: MatTableDataSource<PayrollData>
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public payrollService: PayrollService,
              private notiService: NotificationService) {
                this.fetchPayroll();
              }

  ngOnInit(): void {
  }


  fetchPayroll(){
    const id = localStorage.getItem('userId');
    this.payrollService.getPayrollByEmpId(id)
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

}
