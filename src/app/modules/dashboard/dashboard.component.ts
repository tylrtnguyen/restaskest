import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ManagerDashboardService } from '../../services/manager-dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeData } from '../../models/employee-data/employee-data.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lineChart = [];
  pieChart = [];
  // displayedColumns: string[] = ['ID', 'name', 'wages', 'position'];
  columns_to_display: string[] =['fName','lName', 'address', 'DOB', 'wages', 'JoinDate', 'email'];
  // dataSource = new MatTableDataSource<EmployeeElement>(ELEMENT_DATA);
  searchKey: string;
  employeeList: any = [];
  dataSource: MatTableDataSource<EmployeeData>
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private dashboardService: ManagerDashboardService, private employeeService: EmployeeService) { 
    this.fetchEmployee();
  }


  ngOnInit(): void {
    this.lineChart = this.dashboardService.lineChart();
    this.pieChart = this.dashboardService.pieChart();
  }

  fetchEmployee() {
    this.employeeService.getEmployee()
                        .subscribe((employees: EmployeeData[]) => {
                          this.employeeList = employees;
                          this.dataSource = new MatTableDataSource<EmployeeData>(this.employeeList.data as any);
                          this.dataSource.paginator = this.paginator;
                          this.dataSource.sort = this.sort
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