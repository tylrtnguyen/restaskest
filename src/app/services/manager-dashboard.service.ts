import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerDashboardService {

  constructor() { }

  lineChart() {
    return [{
        name: 'Sales',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Supply',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'Employee Payment',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Profit',
        data: [7274, 10717, 7988, 12169, 15112, 22452, 34400, 34227]
    }];
  }

  // Feed data for pie chart
  pieChart() {
    return  [
      {
          name: "Pizza",
          y: 62.74
      },
      {
          name: "Pastry",
          y: 10.57
      },
      {
          name: "Sallad",
          y: 7.23
      },
      {
          name: "Desert",
          y: 5.58
      },
      {
          name: "Appetizer",
          y: 13.56
      }
  ]
  }
}
