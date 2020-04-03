import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider'
import { MatCardModule } from '@angular/material/card'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { ManagerDashboardService } from 'src/app/services/manager-dashboard.service'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { EmployeeComponent } from 'src/app/modules/employee/employee.component';
import { EmployeeDialogComponent } from 'src/app/modules/employee/employee-dialog/employee-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InventoryDialogComponent } from 'src/app/modules/inventory/inventory-dialog/inventory-dialog.component';
import { TimeclockComponent } from 'src/app/modules/timeclock/timeclock.component';
import { ScheduleComponent } from 'src/app/modules/schedule/schedule.component';
import { AddShiftDialogComponent } from '../../modules/schedule/add-shift-dialog/add-shift-dialog.component';
import { PayrollComponent } from '../../modules/payroll/payroll.component';
import { EmployeeDashboardComponent } from '../../modules/employee-dashboard/employee-dashboard.component';
import { EmployeeScheduleComponent } from '../../modules/employee-schedule/employee-schedule.component';
import { EmployeeInventoryComponent } from '../../modules/employee-inventory/employee-inventory.component';
import { EmployeePayrollComponent } from '../../modules/employee-payroll/employee-payroll.component';
import { EmployeeProfileComponent } from '../../modules/employee-profile/employee-profile.component';






@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    EmployeeComponent,
    EmployeeDialogComponent,
    InventoryDialogComponent,
    TimeclockComponent,
    ScheduleComponent,
    PayrollComponent,
    AddShiftDialogComponent,
    EmployeeDashboardComponent,
    EmployeeScheduleComponent,
    EmployeeInventoryComponent,
    EmployeePayrollComponent,
    EmployeeProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [
    ManagerDashboardService,
    MatDatepickerModule
  ]
})
export class DefaultModule { }
