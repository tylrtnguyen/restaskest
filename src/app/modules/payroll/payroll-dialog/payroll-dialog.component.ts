import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeData } from 'src/app/models/employee-data/employee-data.model';
import { MatDialogRef } from '@angular/material/dialog';
import { PayrollService } from 'src/app/services/payroll.service';

@Component({
  selector: 'app-payroll-dialog',
  templateUrl: './payroll-dialog.component.html',
  styleUrls: ['./payroll-dialog.component.css']
})
export class PayrollDialogComponent implements OnInit {

  employeeList: any = []
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(public employeeService: EmployeeService,
              public dialogRef: MatDialogRef<PayrollDialogComponent>,
              public payrollService: PayrollService
              ) {
    this.fetchEmployee();
  }

  ngOnInit(): void {

  }

  fetchEmployee() {
    this.employeeService.getEmployee()
                        .subscribe((employees: EmployeeData[]) => {
                          this.employeeList = employees['data'];
                        })
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  
  upload(){
    this.progress.percentage = 0;
 
    this.currentFileUpload = this.selectedFiles.item(0);
    this.payrollService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
    this.selectedFiles = undefined;
  }

  
  

  onSubmit(){

  }


  onClose(){
    this.dialogRef.close();
  }

}
