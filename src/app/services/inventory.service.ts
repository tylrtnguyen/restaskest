import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, FormsModule, FormGroup, NgForm, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  SERVER = 'https://restaskest84.appspot.com/api'
  token = localStorage.getItem('token')

  formControl: FormGroup = new FormGroup({
    _id: new FormControl(null),
    name: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    stockStatus: new FormControl('', Validators.required),
  });

  initializeFormGroup(){
    this.formControl.setValue({
      _id: null,
      name: '',
      quantity: 0,
      stockStatus: 'None'
    })
  }

  populateForm(material){
    this.formControl.setValue(material)
  }

  getMaterial(){
    return this.http.get(`${this.SERVER}/material`, {
      headers: new HttpHeaders()
      .set("Authorization", `Bearer ${this.token}`)
    })
  }

  updateMaterial(material) {
    return this.http.put(`${this.SERVER}/material/${material._id}`, material , 
    {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
                                .set("Content-Type", "application/json")
    })
  }

  deleteMaterial(id: string) {
    return this.http.delete(`${this.SERVER}/material/${id}`)
  }

  addMeterial(material){
    return this.http.post(`${this.SERVER}/material`, material,
    {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
                                .set("Content-Type", "application/json")
    })
  } 
}
