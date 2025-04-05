import { Component, ViewChild, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, DoughnutControllerChartOptions } from 'chart.js';

@Component({
  selector: 'app-radial',
  templateUrl: './radial.component.html',
  standalone:false
})
export class RadialComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  public radialChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      r: {
        display: false,
        grid: { display: false },
        ticks: { display: false }
      }
    },
    cutout: '68%',
    
    }
  public radialChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 0,
      }
    ]
  };

  ngOnInit() {
    this.populateChartData();
  }

  populateChartData(){
    const apexSeries = [90, 85, 70];
    const apexLabels = ["Done", "In progress", "To do"];
    const apexColors = ["#1C64F2", "#16BDCA", "#FDBA8C"];

    this.radialChartData = {
      labels: apexLabels,
      datasets: [
        {
          data: apexSeries,
          backgroundColor: apexColors,
          borderWidth: 0,
        }
      ]
    };

    this.chart?.update();
  }

  public chartClicked({ event, active }: { event?: ChartEvent, active?: { index: number }[] }): void {
    console.log(event, active);
  }
}
