import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef } from '@angular/material/dialog'; 


interface Department {
  id: number;
  name: string;
}

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  constructor(public service: EmployeeService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<EmployeeDialogComponent>) { }

  ngOnInit(): void {
  }

  departments: Department[]  = [
    { id: 1, name: 'FOH' },
    { id: 2, name: 'BOH' },
    { id: 3, name: 'Host'},
    { id: 4, name: 'Management'}];

    

    onClear(){
      this.service.formControl.reset();
      this.service.initializeFormGroup();
    }

    onSubmit() {
      if(this.service.formControl.valid){
        if(!this.service.formControl.get('_id').value){
          this.service.insertEmployee(this.service.formControl.value).subscribe(response => {
            if(response){
              this.notificationService.success('Congrats! Employee added successfully!!');
            }
          });
        }
        else {
          this.service.updateEmployee(this.service.formControl.value).subscribe(response => {
            if(response){
              this.notificationService.success('Congrats! Employee updated successfully!!');
            }
          })
        }
        
        this.onClose();
        this.service.formControl.reset()
        this.service.initializeFormGroup();
      }
    }

    onClose(){
      this.service.formControl.reset();
      this.service.initializeFormGroup();
      this.dialogRef.close();
    }

}
