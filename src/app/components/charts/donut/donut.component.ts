import { Component, Input, SimpleChanges, ViewChild, OnInit, OnChanges, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { DoughnutControllerChartOptions } from 'chart.js';
import { formatNumberWithCurrencySuffix, generatePieChartColors } from '../../../utils/application.helper';
import { SettingsManagerService } from '../../../services/settings-manager.service';
@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  standalone: false
})
export class DonutComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  private _settingsService: SettingsManagerService = inject(SettingsManagerService);


  @Input() series: { name: string, color: string, data: number[] }[] = [];
  @Input() labels: string[] = [];
  public currentDataSet;
  private backgroundColors = [];
  public sortedSeries: any[];
  public sortedLabels: any[]
  public tabularView = false;
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
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            return this.getFormatedNumbers(value)
          }
        }
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
      this.currentDataSet = this.series[0].name
      this.backgroundColors = generatePieChartColors(this.labels.length);
      this.sortChart();
      this.updateChartData();
    }
  }

  updateChartData(): void {
    this.doughnutChartData = {
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

  public chartClicked({ event, active }: { event?: ChartEvent, active?: { index: number }[] }): void {
    console.log(event, active);
    if (active && active.length > 0) {
      const dataIndex = active[0].index;
      const label = this.doughnutChartData.labels?.[dataIndex];
      const value = this.doughnutChartData.datasets[0].data[dataIndex];
      console.log(`Clicked on slice: ${label}, value: ${value}`);
    }
  }
  onDataSetChange(event: any) {
    this.currentDataSet = event;
    this.sortChart();
    this.updateChartData();
  }
  getFormatedNumbers(num: number): string {
        return formatNumberWithCurrencySuffix(num, this._settingsService.currencySymbol) 
      };
}
