import {Input, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts'
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  constructor() { }

  chartOptions: {}
  Highcharts = Highcharts;
  
  @Input() data: any = [];

  ngOnInit(): void {
    this.chartOptions = {

      title: {
          text: 'GoodFood Restaurant Annual Report - 2019'
      },
  
      subtitle: {
          text: 'By Restaskest Team'
      },
  
      yAxis: {
          title: {
              text: 'Money Flow'
          }
      },
  
      xAxis: {
          accessibility: {
              rangeDescription: 'Range: 2012 - 2019'
          }
      },
  
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },
  
      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
              pointStart: 2012
          }
      },
      exporting: {
        enabled: true
      },

      credits: {
        enabled: true
      },

      series: this.data
    };
    HC_exporting(Highcharts);

    // Automatically resize high chart
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300)
  }

}
