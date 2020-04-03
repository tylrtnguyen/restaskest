import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { PayrollService } from 'src/app/services/payroll.service';
import { NotificationService } from 'src/app/services/notification.service';
import { EmployeeData } from 'src/app/models/employee-data/employee-data.model';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-sendto-dialog',
  templateUrl: './sendto-dialog.component.html',
  styleUrls: ['./sendto-dialog.component.css']
})
export class SendtoDialogComponent implements OnInit {

  employeeList: any = [];
  constructor(private employeeService: EmployeeService,
              public payrollService: PayrollService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<SendtoDialogComponent>) {
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

  onClose(){
    this.dialogRef.close()
    this.payrollService.formControl.reset()
    this.payrollService.initializeFormGroup();
  }

  onSubmit(){
    this.payrollService.sendToEmployee(this.payrollService.formControl.value).subscribe(response => {
      if(response){
        this.notificationService.success('Congrats! Payroll sent successfully!!');
      }
    })
    this.onClose();
  }

}
