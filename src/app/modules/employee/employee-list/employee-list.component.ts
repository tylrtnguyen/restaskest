import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// Material utilities import
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// Model import
import { EmployeeData } from '../../../models/employee-data/employee-data.model';
// Service import
import { EmployeeService } from '../../../services/employee.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  
  searchKey: string;
  columns_to_display: string[] =['fName','lName', 'address', 'DOB', 'department', 'wages', 'JoinDate', 'email', 'actions'];
  employeeList: any = [];
  dataSource: MatTableDataSource<EmployeeData>
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: EmployeeService, private router: Router,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              private dialogService: DialogService) {
      this.fetchEmployee();
   }

  ngOnInit(): void {
    
  }

  fetchEmployee() {
    this.service.getEmployee()
                        .subscribe((employees: EmployeeData[]) => {
                          this.employeeList = employees;
                          this.dataSource = new MatTableDataSource<EmployeeData>(this.employeeList.data as any);
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

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%"
    this.dialog.open(EmployeeDialogComponent, dialogConfig);
  }

  formControl: FormGroup = new FormGroup({
    _id: new FormControl(null),
    fName: new FormControl('', Validators.required),
    lName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, 
                                    Validators.minLength(8)]),
    address: new FormControl('', Validators.required),
    wages: new FormControl('', Validators.required),
    gender: new FormControl('1'),
    JoinDate: new FormControl(''),
    department: new FormControl(0),
    DOB: new FormControl(''),
    isPermanent: new FormControl(false)
  });


  onUpdate(row){
    // Destructuring
    let {__v, ...employee} = row;
    this.service.populateForm(employee);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%"
    this.dialog.open(EmployeeDialogComponent, dialogConfig);
  }

  
  onDelete(_id) {
    this.dialogService.openDialog('Are you sure to delete this employee?')
                      .afterClosed().subscribe(res => {
                        if(res){
                          this.service.deleteEmployee(_id).subscribe(data => {
                            console.log(data)
                          });
                          this.notificationService.warn('Successfully deleted employee')
                        }
                      });
  }
}
