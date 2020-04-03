import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { ScheduleService } from 'src/app/services/schedule.service';
import { Schedule } from '../../models/schedule-data/schedule-data.model'
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  constructor(public scheduleService: ScheduleService,
              private notiService: NotificationService) {
    this.fetchEmpShift() 
  }

  clockIn = false;
  buttonName: string = "Clock In";
  buttonColor: string = "primary"
  employeeShift: any;
  clockInTime: string = '00:00:00';
  clockOutTime: string = '00:00:00';
  timeInCalculate: number;
  timeOutCalculate: number;
  totalWorkHour: any = 0;

  date = moment().format('LLLL')

  ngOnInit(): void {

  }

  fetchEmpShift(){
    const empId = localStorage.getItem('userId')
    this.scheduleService.getShiftByEmployeeId(empId).subscribe((shifts: Schedule) => {
      const data = shifts['data'][0];
      if(data){
        this.employeeShift = {
          date: moment(data.date).format('LL'),
          employeeName: data.employeeName,
          start: data.start,
          stop: data.stop,
          wages: data.wages
        }
      }
      else {
        this.employeeShift = {
          date: 'None',
          employeeName: 'None',
          start: 'None',
          stop: 'None',
          wages: data.wages
        }
      }
      
    })
  }

  getCurrentTime(){
    return moment().format('HH:mm:ss')
  }

  calculateTotalHour(start, stop) {
    const seconds = (stop - start)/1000;
    const hours = seconds/3600
    const mins = seconds/60
    const formatHours = Math.round((hours  * 100) / 100)
    return {seconds, mins, formatHours}
  }

  changeStatus(){
    this.clockIn = !this.clockIn;
    if(this.clockIn){
      this.clockInTime = this.getCurrentTime();
      this.timeInCalculate = new Date().getTime();
      this.notiService.success(`You already clocked in at ${this.clockInTime}`)
      this.buttonName = "Clock Out"
      this.buttonColor = "warn"
    }
    else {
      this.clockOutTime = this.getCurrentTime();
      this.timeOutCalculate = new Date().getTime();
      this.notiService.warn(`You already clocked out at ${this.clockOutTime}`)
      // this.totalWorkHour = this.clockOutTime - this.clockInTime;
      console.log(this.calculateTotalHour(this.timeInCalculate, this.timeOutCalculate))
      this.totalWorkHour = this.calculateTotalHour(this.timeInCalculate, this.timeOutCalculate)
      this.buttonName = "Clock In"
      this.buttonColor = "primary"
    }
  }

}
