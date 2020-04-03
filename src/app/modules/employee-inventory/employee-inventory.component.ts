import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// Material utilities import
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// Model import
import { MaterialData } from '../../models/material-data/material-data.model';
// Service import
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryDialogComponent } from '../inventory/inventory-dialog/inventory-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-employee-inventory',
  templateUrl: './employee-inventory.component.html',
  styleUrls: ['./employee-inventory.component.css']
})
export class EmployeeInventoryComponent implements OnInit {

  searchKey: string;
  columns_to_display: string[] =['name','quantity', 'stockStatus', 'actions'];
  materialList: any = [];
  dataSource: MatTableDataSource<MaterialData>
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: InventoryService, private router: Router,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              private dialogService: DialogService) {
    this.fetchMaterial();
   }

  ngOnInit(): void {
  }

  fetchMaterial() {
    this.service.getMaterial()
                        .subscribe((materials: MaterialData[]) => {
                          this.materialList = materials;
                          this.dataSource = new MatTableDataSource<MaterialData>(this.materialList.data as any);
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


  onUpdate(row){
    // Destructuring
    let {__v, ...material} = row;
    this.service.populateForm(material);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%"
    this.dialog.open(InventoryDialogComponent, dialogConfig);
  }
}
