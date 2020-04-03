import { Input, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts'
import HC_exporting from 'highcharts/modules/exporting'

@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  @Input() data: any = [];

  Highcharts = Highcharts
  chartOptions = {}

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Sold items by category'
      },
      subtitle: {
          text: 'By Restaskest Team'
      },
  
      accessibility: {
          announceNewData: {
              enabled: true
          },
          point: {
              valueSuffix: '%'
          }
      },
  
      plotOptions: {
          series: {
              dataLabels: {
                  enabled: true,
                  format: '{point.name}: {point.y:.1f}%'
              }
          }
      },
      credits: {
        enabled: false
      }, 
      
      tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
  
      series: [
          {
              data: this.data
          }
      ]
  };
  setTimeout(() => {
    window.dispatchEvent(
      new Event('resize')
    );
  }, 300)
  }

}
