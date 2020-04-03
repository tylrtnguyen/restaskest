import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { ScheduleService } from 'src/app/services/schedule.service';
import { NotificationService } from 'src/app/services/notification.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeData } from '../../../models/employee-data/employee-data.model'


@Component({
  selector: 'app-add-shift-dialog',
  templateUrl: './add-shift-dialog.component.html',
  styleUrls: ['./add-shift-dialog.component.css']
})
export class AddShiftDialogComponent implements OnInit {

  employeeList: any = []

  constructor(private dialogRef: MatDialogRef<AddShiftDialogComponent>,
              public service: ScheduleService,
              public employeeService: EmployeeService,
              private notificationService: NotificationService) { 
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
    this.service.formControl.reset()
    this.service.initializeFormGroup();
  }

  onClear(){
    this.service.formControl.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(!this.service.formControl.get('id').value){
      this.service.addShift(this.service.formControl.value).subscribe(response => {
        if(response){
          this.notificationService.success('Congrats! Shift added successfully!!');
        }
      });
    }
    else {
      this.service.updateShift(this.service.formControl.value).subscribe(response => {
        if(response){
          console.log(response)
          this.notificationService.success('Congrats! Shift updated successfully!!');
        }
      })
    }
    this.onClose();
  }
}
