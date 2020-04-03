import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private http: HttpClient) { }

  SERVER = "https://restaskest84.appspot.com/api";
  token = localStorage.getItem('token');


  formControl: FormGroup = new FormGroup({
    _id: new FormControl(null),
    fName: new FormControl('', Validators.required),
    lName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, 
                                    Validators.minLength(8)]),
    address: new FormControl('', Validators.required),
    wages: new FormControl('', Validators.required),
    gender: new FormControl('1'),
    department: new FormControl(0),
    DOB: new FormControl(''),
    JoinDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });

  initializeFormGroup() {
    this.formControl.setValue({
      _id: null,
      fName: '',
      lName: '',
      email: '',
      wages: '',
      password: '',
      address: '',
      gender: 'Male',
      department: 0,
      DOB: '',
      JoinDate: '',
      isPermanent: false
    })
  }

  populateForm(employee){
    this.formControl.setValue(employee);
  }

  getEmployee(){
    return this.http.get(`${this.SERVER}/employee`, {
      headers: new HttpHeaders()
      .set("Authorization", `Bearer ${this.token}`)
    })
  }

  getOneEmployee(){
    const employeeId = localStorage.getItem('userId');
    return this.http.get(`${this.SERVER}/employee/${employeeId}`, {
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
    })
  }

  insertEmployee(employee){
    // Create a custom type of DOB
    let now = moment(employee.DOB).format('YYYY-MM-DD')
    return this.http.post(`${this.SERVER}/employee`, {
      "fName": employee.fName,
      "lName": employee.lName,
      "gender": employee.gender,
      "department": employee.department,
      "address": employee.address,
      "wages": employee.wages,
      "DOB": now,
      "isPermanent": employee.isPermanent,
      "email": employee.email,
      "password": employee.password
    }, 
    {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
                                .set("Content-Type", "application/json")
    })
  }

  updateEmployee(employee) {
    return this.http.put(`${this.SERVER}/employee/${employee._id}`, employee , 
    {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
                                .set("Content-Type", "application/json")
    })
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.SERVER}/employee/${id}`)
  }
}
