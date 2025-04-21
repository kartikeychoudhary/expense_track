import { Component, Input, SimpleChanges, ViewChild, OnInit, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { generateRandomColorArray } from '../../../utils/application.helper';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  standalone: false
})
export class PieComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() series: { name: string, color: string, data: number[] }[] = [];
  @Input() labels: string[] = [];
  public currentDataSet;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        align: 'start',
        labels: {
        }
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        display: true,
        color: '#fff',
        anchor: 'center',
        align: 'center',
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data as number[];
          if (Array.isArray(dataArr)) {
            sum = dataArr
              .map(data => Number(data))
              .filter(num => !isNaN(num))
              .reduce((acc, num) => acc + num, 0);
          }
          let numericValue = Number(value);
          let percentage = sum === 0 || isNaN(numericValue) ? '0.0%' : (numericValue * 100 / sum).toFixed(1) + "%";
          return numericValue;
        },
      }
    }
  };
  public pieChartType: ChartType = 'pie';

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      }
    ]
  };

  public pieChartPlugins: any[] = [];

  ngOnInit() {
    import('chartjs-plugin-datalabels').then(plugin => {
      if (!this.pieChartPlugins.includes(plugin.default)) {
        this.pieChartPlugins = [...this.pieChartPlugins, plugin.default];
      }
    }).catch(err => console.error('Error loading chartjs-plugin-datalabels', err));
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['series'] || changes['labels']) {
      this.updateChartData();
      this.chart?.update();
    }
  }

  updateChartData(): void {
    this.currentDataSet = this.series[0].name
    this.pieChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.series[0].data,
        }
      ]
    };
  }

  public chartClicked({ event, active }: { event?: ChartEvent, active?: { index: number }[] }): void {
    console.log(event, active);
    if (active && active.length > 0) {
      const dataIndex = active[0].index;
      const label = this.pieChartData.labels?.[dataIndex];
      const value = this.pieChartData.datasets[0].data[dataIndex];
      console.log(`Clicked on slice: ${label}, value: ${value}`);
    }
  }

  onDataSetChange(event: any) {
    const selectedValue = event;
    const selectedDataSet = this.series.find((dataset) => dataset.name === selectedValue);
    if (selectedDataSet) {
      this.currentDataSet = selectedValue;
      this.pieChartData = {
        labels: this.labels,
        datasets: [
          {
            data: selectedDataSet.data,
          }
        ]
      };
      this.chart?.update();
    }
  }
}
