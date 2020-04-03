import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule, FormGroupDirective, NgForm, Validators } from '@angular/forms';
 
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';


export class CustomErrorMatcher implements ErrorStateMatcher{

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthenticationService) { }

  isLoading = false;
  hide = true;

  private authStatusSub: Subscription;

  // Create an email form control
  managerEmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  // Create a password form control
  managerPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.{8,})')
  ]);

  employeeEmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  // Create a password form control
  employeePasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.{8,})')
  ]);

  // Create an instance of CustomErrorMatcher class
  matcher = new CustomErrorMatcher();


  // Manager credentials
  managerEmail: String;
  managerPassword: String;

  // Employee credentials
  employeeEmail: String;
  employeePassword: String;


  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    )
  }

  managerLogin(email, password){
    this.isLoading = true;
    this.authService.managerLogin(email, password)
  }

  employeeLogin(email, password){
    this.isLoading = true;
    this.authService.employeeLogin(email, password)
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

}
