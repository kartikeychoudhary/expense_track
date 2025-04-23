import { Component, Input, SimpleChanges, ViewChild, OnInit, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { generatePieChartColors, generateRandomColorArray } from '../../../utils/application.helper';

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
  private backgroundColors = [];
  private sortedSeries: any[];
  private sortedLabels: any[]

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
      this.currentDataSet = this.series[0].name
      this.backgroundColors = generatePieChartColors(this.labels.length);
      this.sortChart()
      this.updateChartData();
    }
  }

  updateChartData(): void {
    
    this.pieChartData = {
      labels: this.sortedLabels,
      datasets: [
        {
          data: this.sortedSeries,
          backgroundColor: this.backgroundColors
        }
      ]
    };
    this.chart?.update();
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

  sortChart() {
    const selectedDataSet = this.series.find((dataset) => dataset.name === this.currentDataSet)
    if (!this.series || !this.labels || selectedDataSet.data.length !== this.labels.length) {
      this.sortedLabels = this.labels;
      this.sortedSeries = selectedDataSet.data;
      return;
    }
    const combinedData = selectedDataSet.data.map((item, index) => {
      return { label: this.labels[index], value: item };
    });
    combinedData.sort((a, b) => b.value - a.value);
    this.sortedLabels = combinedData.map(val => val.label);
    this.sortedSeries = combinedData.map(val => val.value);
    for (let i = 0; i < this.sortedSeries.length; i++) {
      if(this.sortedSeries[i] === 0){
        this.sortedSeries.splice(i, 1);
        this.sortedLabels.splice(i, 1);
        i--;
      }
    }

  }

  onDataSetChange(event: any) {
    this.currentDataSet = event;
    this.sortChart();
    this.updateChartData()
  }
}
