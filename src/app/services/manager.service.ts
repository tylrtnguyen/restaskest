import { Injectable } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private authService: AuthenticationService,
              private http: HttpClient) { }

  SERVER = 'https://restaskest84.appspot.com/api';
  token = localStorage.getItem('token');
  managerID = localStorage.getItem('userId');

  formControl: FormGroup = new FormGroup({
    _id: new FormControl(null),
    fName: new FormControl('', Validators.required),
    lName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, 
                                    Validators.minLength(8)]),
    address: new FormControl('', Validators.required),
    restaurants: new FormControl(''),
    salary: new FormControl('', Validators.required),
    DOB: new FormControl(''),
    JoinDate: new FormControl(''),
    date: new FormControl('')
  });

  initializeFormGroup() {
    this.formControl.setValue({
      _id: null,
      fName: '',
      lName: '',
      email: '',
      salary: '',
      password: '',
      restaurants: '',
      address: '',
      DOB: '',
      JoinDate: '',
      date: ''
    })
  }

  getManager(){
    return this.http.get(`${this.SERVER}/manager/${this.managerID}`, {
      headers: new HttpHeaders()
      .set("Authorization", `Bearer ${this.token}`)
    })
  }

  updateManager(manager) {
    return this.http.put(`${this.SERVER}/manager/${manager._id}`, manager , 
    {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
                                .set("Content-Type", "application/json")
    })
  }

  populateForm(manager){
    this.formControl.setValue(manager);
  }
}
