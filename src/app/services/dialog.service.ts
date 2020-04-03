import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { CustomConfirmDialogComponent } from '../modules/custom-confirm-dialog/custom-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(confirm){
    return this.dialog.open(CustomConfirmDialogComponent,{
      width: '400px',
      // create a global class for dialog
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      // Place the dialog on top of the view
      position: {top: "10px"},
      data: {
        confirm
      }
    })
  }
}
