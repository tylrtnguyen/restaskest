import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { DefaultModule } from './layouts/default/default.module';
import { LoginComponent } from './login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';
import { MatTableModule } from '@angular/material/table' 
import { EmployeeListComponent } from './modules/employee/employee-list/employee-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmployeeDialogComponent } from './modules/employee/employee-dialog/employee-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from './modules/profile/profile.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { InventoryComponent } from './modules/inventory/inventory.component';
import { CustomConfirmDialogComponent } from './modules/custom-confirm-dialog/custom-confirm-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PayrollDialogComponent } from './modules/payroll/payroll-dialog/payroll-dialog.component';
import { MatListModule } from '@angular/material/list';
import { SendtoDialogComponent } from './modules/payroll/sendto-dialog/sendto-dialog.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    EmployeeListComponent,
    ProfileComponent,
    InventoryComponent,
    CustomConfirmDialogComponent,
    PayrollDialogComponent,
    SendtoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DefaultModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatListModule
  ],
  // Provide the default interceptor with our custom interceptor
  // Multi is to tell angular don't override interceptor, but adding a new one instead
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, EmployeeDialogComponent, CustomConfirmDialogComponent]
})
export class AppModule { }
