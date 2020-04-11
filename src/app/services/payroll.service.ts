import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpEvent,
  HttpHeaders
} from "@angular/common/http";
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { Observable, Subject } from "rxjs";
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';

@Injectable({
  providedIn: "root"
})
export class PayrollService {
  constructor(private http: HttpClient) {}

  SERVER = "https://restaskest-api.herokuapp.com/api/payroll";
  token = localStorage.getItem('token');


  formControl: FormGroup = new FormGroup({
    _id: new FormControl(null),
    employee_id: new FormControl(''),
    file_title: new FormControl('', Validators.required),
    file_URL: new FormControl('', Validators.required),
    uploaded_at: new FormControl('', Validators.required)
  });

  initializeFormGroup(){
    this.formControl.setValue({
      _id: null,
      employee_id: '',
      file_title: '',
      file_URL: '',
      uploaded_at: ''
    })
  }

  populateForm(payroll){
    console.log(payroll)
    this.formControl.setValue(payroll)
  }

  sendToEmployee(payroll) {
    return this.http.put(`${this.SERVER}/${payroll._id}`, payroll,
      {
        headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
                                  .set("Content-Type", "application/json")
      })
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
 
    formdata.append('file', file);
 
    const req = new HttpRequest('POST', `${this.SERVER}/upload`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }
 
  getFiles(): Observable<any> {
    return this.http.get(`${this.SERVER}/all`, {
      headers: new HttpHeaders()
                   .set('Authorization', `Bearer ${this.token}`)
    });
  }

  getPayrollByEmpId(id) {
    return this.http.get(`${this.SERVER}/emp/${id}`, {
      headers: new HttpHeaders()
                   .set('Authorization', `Bearer ${this.token}`)
    })
  }

}
