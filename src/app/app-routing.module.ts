import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ScheduleComponent } from './modules/schedule/schedule.component';
import { InventoryComponent } from './modules/inventory/inventory.component';
import { TimeclockComponent } from './modules/timeclock/timeclock.component';
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './services/auth-guard';
import { EmployeeListComponent } from './modules/employee/employee-list/employee-list.component';
import { ProfileComponent } from './modules/profile/profile.component'
import { ManagerDashboardGuard } from './services/manager-dashboard-guard';
import { EmployeeDashboardComponent } from './modules/employee-dashboard/employee-dashboard.component';
import { EmployeeScheduleComponent } from './modules/employee-schedule/employee-schedule.component';
import { EmployeeInventoryComponent } from './modules/employee-inventory/employee-inventory.component';
import { EmployeePayrollComponent } from './modules/employee-payroll/employee-payroll.component';
import { EmployeeProfileComponent } from './modules/employee-profile/employee-profile.component';
import { PayrollComponent } from './modules/payroll/payroll.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  {
  path: 'dashboard',
  component: DefaultComponent,
  canActivate: [ManagerDashboardGuard],
  children: [
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'schedule',
      component: ScheduleComponent
    },
    {
      path: 'inventory',
      component: InventoryComponent
    },
    {
      path: 'timeclock',
      component: TimeclockComponent
    },
    {
      path: 'payroll',
      component: PayrollComponent
    },
    {
      path: 'employee',
      component: EmployeeListComponent,
      children: [{
        path: '',
        component: EmployeeListComponent
      }]
    },
    {
      path: 'profile',
      component: ProfileComponent,
      children: [{
        path: '',
        component: ProfileComponent
      }]
    }
  ]
},{
  path: 'employee/dashboard',
  component: DefaultComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: EmployeeDashboardComponent
    },
    {
      path: 'schedule',
      component: EmployeeScheduleComponent
    },
    {
      path: 'inventory',
      component: EmployeeInventoryComponent
    },
    {
      path: 'payroll',
      component: EmployeePayrollComponent
    },
    {
      path: 'profile',
      component: EmployeeProfileComponent
    }]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, ManagerDashboardGuard]
})
export class AppRoutingModule { }
