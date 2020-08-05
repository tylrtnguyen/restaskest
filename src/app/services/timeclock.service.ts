import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TimeclockService {

  constructor(private http: HttpClient) { }
  SERVER = 'https://restaskest-api.ue.r.appspot.com/api/schedule'
  token = localStorage.getItem('token')

  getWorkHourReport(dateObj){
    const {startDate, stopDate} = dateObj
    return this.http.get(`${this.SERVER}/workhours/${startDate}/${stopDate}`, {
      headers: new HttpHeaders()
      .set("Authorization", `Bearer ${this.token}`)
    })
  }

  formControl: FormGroup = new FormGroup({
    _id: new FormControl(null),
    startDate: new FormControl('', Validators.required),
    stopDate: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.formControl.setValue({
      _id: null,
      startDate: '',
      stopDate: ''
    })
  }
}
