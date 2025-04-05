import { Component, Input, SimpleChanges, ViewChild, OnInit, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { DoughnutControllerChartOptions } from 'chart.js';
@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  standalone:false
})
export class DonutComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() series: number[] = [];
  @Input() labels: string[] = [];
  @Input() duration: string;

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
        }
      },
      tooltip: {
        enabled: true,
      },
    }
  };
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      { 
        data: [],
      }
    ]
  };

  ngOnInit(): void {
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['series'] || changes['labels']) {
      this.sortChart();
      this.updateChartData();
      this.chart?.update();
    }
  }

  updateChartData(): void {
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.series,
        }
      ]
    };
  }
  
  sortChart(){
    if (!this.series || !this.labels || this.series.length !== this.labels.length) {
      return;
    }
    const combinedData = this.series.map((item, index) => {
      return { label: this.labels[index], value: item };
    });
    combinedData.sort((a, b) => b.value - a.value);
    this.labels = combinedData.map(val => val.label);
    this.series = combinedData.map(val => val.value);
  }

  public chartClicked({ event, active }: { event?: ChartEvent, active?: { index: number }[] }): void {
    console.log(event, active);
    if (active && active.length > 0) {
      const dataIndex = active[0].index;
      const label = this.doughnutChartData.labels?.[dataIndex];
      const value = this.doughnutChartData.datasets[0].data[dataIndex];
      console.log(`Clicked on slice: ${label}, value: ${value}`);
    }
  }
}
