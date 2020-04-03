import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { FormControl, Validators, FormGroup } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }
  SERVER = 'https://restaskest84.appspot.com/api/schedule';
  token = localStorage.getItem('token');

  formControl: FormGroup = new FormGroup({
    id: new FormControl(null),
    shiftId: new FormControl(null),
    date: new FormControl('', Validators.required),
    employeeId: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    stop: new FormControl('',Validators.required)
  });

  initializeFormGroup(){
    this.formControl.setValue({
      id: null,
      shiftId: '',
      date: '',
      employeeId: '',
      start: 0,
      stop: 0,
    })
  }

  populateForm(schedule){
    this.formControl.setValue(schedule)
  }
  

  getAllShifts(){
    return this.http.get(`${this.SERVER}/shift/all`, {
      headers: new HttpHeaders()
      .set("Authorization", `Bearer ${this.token}`)
    })
  }

  getShiftByEmployeeId(empId){
    return this.http.get(`${this.SERVER}/shift/${empId}`)
  }

  addShift(rawSchedule){
    const {date, start, stop, employeeId } = rawSchedule;
    const formatDate = date.toISOString();
    const formatStart = parseInt(start, 10);
    const formatStop = parseInt(stop, 10);
    return this.http.post(`${this.SERVER}/`, {
        workDays:[{
          date: formatDate,
          assignedStartHour: formatStart,
          assignedStopHour: formatStop
        }],
        employee: employeeId
    },{
      headers: new HttpHeaders()
      .set('Authorization',`Bearer ${this.token}`)
    })

  }

  updateShift(shift){
    const {shiftId, date, start, stop} = shift;
    return this.http.put(`${this.SERVER}/${shift.id}`, {
      workDays: [{
        _id: shiftId,
        date: date,
        assignedStartHour: start,
        assignedStopHour: stop
      }]
    }, {
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
    })

  }

  deleteShift(id){
    return this.http.delete(`${this.SERVER}/${id}`)
  }
}
