import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../services/notification.service'

@Component({
  selector: 'app-inventory-dialog',
  templateUrl: './inventory-dialog.component.html',
  styleUrls: ['./inventory-dialog.component.css']
})
export class InventoryDialogComponent implements OnInit {

  constructor(public service: InventoryService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<InventoryDialogComponent>) { }

  ngOnInit(): void {
  }

  onClose(){
    this.service.formControl.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear(){
    this.service.formControl.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.formControl.valid){
      if(!this.service.formControl.get('_id').value){
        this.service.addMeterial(this.service.formControl.value).subscribe(response => {
          if(response){
            this.notificationService.success('Congrats! Material added successfully!!');
          }
        });
      }
      else {
        this.service.updateMaterial(this.service.formControl.value).subscribe(response => {
          if(response){
            this.notificationService.success('Congrats! Material updated successfully!!');
          }
        })
      }
      
      this.onClose();
      this.service.formControl.reset()
      this.service.initializeFormGroup();
    }
  }

}
