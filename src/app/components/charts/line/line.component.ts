import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  standalone:false
})
export class LineComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() series: {name: string, color:string, data:number[]}[] = [];
  @Input() labels: string[] = [];

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: true },
        border: { display: false },
        ticks: { display: true }
      },
      y: {
        beginAtZero: true,
        grid: { display: false },
        border: { display: false },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };
  public lineChartType: ChartType = 'line';

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  ngOnInit() {
    this.populateChartData();
  }

  populateChartData(){
    this.lineChartData = {
      labels: this.labels,
      datasets: this.series
    };

    this.chart?.update();
  }

  public chartClicked({ event, active }: { event?: ChartEvent, active?: { datasetIndex: number; index: number }[] }): void {
    console.log(event, active);
  }
}
