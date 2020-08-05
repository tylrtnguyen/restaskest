import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthData } from "../models/auth-data/auth-data.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  SERVER = "https://restaskest-api.ue.r.appspot.com";
  private token: string;
  private userId: string;
  private isAuthenticated = false;
  private role: string;
  // Used to push authentication info to expected components
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  

  managerLogin(email: string, password: string) {
    const managerAuthData: AuthData = {email, password}
    this.http.post<{token: string, userId: string, expiresIn: number, role: string}>(`${this.SERVER}/login/manager`, managerAuthData)
            .subscribe(res => {
              console.log(res)
              const token = res.token;
              this.token = res.token;
              // Check if user credentials is validate
              if(token){
                const expiresDuration = res.expiresIn;
                // Set expiration time
                this.setAuthTimer(expiresDuration);
                // Assign user ID
                this.userId = res.userId
                // Set authentication status
                this.isAuthenticated = true;
                // Set user role
                this.role = res.role;
                // Emit an event that users logged in
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresDuration * 1000)
                this.saveAuthData(token, expirationDate, res.userId, res.role);
                // Test
                console.log(expirationDate)
                this.router.navigate(["/dashboard"]);
              } 
            }, error => {
              this.authStatusListener.next(false);
            })
  }

  employeeLogin(email: string, password: string) {
    const employeeAuthData: AuthData = {email, password}
    this.http.post<{token: string, userId: string, expiresIn: number, role: string}>(`${this.SERVER}/login/employee`, employeeAuthData)
             .subscribe(res => {
               const token = res.token;
               this.token = token;
               // Check if user credentials is validate
               if(token){
                  const expiresDuration = res.expiresIn;
                  // Set expiration time
                  this.setAuthTimer(expiresDuration);
                  // Assign user ID
                  this.userId = res.userId;
                  // Set authentication status
                  this.isAuthenticated = true;
                  // Emit an event that users logged in
                  this.authStatusListener.next(true);
                  const now = new Date();
                  const expirationDate = new Date(now.getTime() + expiresDuration * 1000)
                  this.saveAuthData(token, expirationDate, res.userId, res.role);
                  // Test
                  console.log(expirationDate)
                  this.router.navigate(["employee/dashboard"]);
               } 
             }, error => {
                this.authStatusListener.next(false);
             })
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  // Automatic log user in if token is still valid
  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // Check if token is already expired
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // Getters
  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getAuthStatus(){
    return this.isAuthenticated;
  }

  getUserId () {
    return this.userId;
  }

  getUserRole() {
    return this.role;
  }

  // Clear user authentication data out of local storage
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }

  // Save user authentication data
  private saveAuthData(token: string, expirationDate: Date, userId: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
  } 

  // Set the expiration timer
  private setAuthTimer(duration: number){
    console.log("Setting timer: "+duration);
    this.tokenTimer = setTimeout(() => {
        // Call logout method when token is expired
        this.logout();
    },duration * 1000); //setTimeOut works with millisecond
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if(!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

}
