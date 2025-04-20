import { Component, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType, ActiveElement } from 'chart.js';
import { SettingsManagerService } from '../../../services/settings-manager.service';
import { formatNumberWithCurrencySuffix } from '../../../utils/application.helper';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  standalone:false
})
export class BarComponent {
  private _settingsService: SettingsManagerService = inject(SettingsManagerService);

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() series: {name: string, color:string, data:number[]}[] = [];
  @Input() labels: string[] = [];
  @Output() event = new EventEmitter<{seriesIndex: number, label: string, isSelected: boolean}>();

  // Added property for dynamic height
  chartContainerHeight: number = 300; // Default height

  income: number = 0;
  expense: number = 0;
  net: number = 0;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        stacked: false,
        grid: { display: true },
        ticks: { display: true }
      },
      y: {
        stacked: false,
        grid: { display: false },
        ticks: { display: true }
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
        callbacks: {
          label: (context) => this.getFormatedNumbers(Number(context.parsed.x))
        }

      },
      
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public barChartLabels: string[] = [];

  ngOnInit() {
    this.updateChartData();
    this.updateSummaryLabels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['series'] || changes['labels']) {
      this.updateChartData();
      this.updateSummaryLabels();
      this.chart?.update();
    }
  }

  updateSummaryLabels(){
    this.income = 0;
    this.expense = 0;
    this.series.forEach(ser => {
      const sum = ser.data.reduce((acc, val) => acc + (val || 0), 0);
      if(ser.name === 'Income' || ser.name === 'CREDIT'){
        this.income = sum;
      } else {
        this.expense = sum;
      }
    });
    this.net = this.income - this.expense;
  }

  updateChartData(): void {
    this.barChartLabels = this.labels || [];
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: this.series.map(s => ({
        data: s.data,
        label: s.name,
        backgroundColor: s.color || this.getDefaultColor(s.name),
        borderColor: s.color || this.getDefaultColor(s.name),
        borderWidth: 1,
      }))
    };

    // Calculate dynamic height
    const baseHeight = 150; // Minimum height
    const heightPerLabel = 30; // Pixels per label
    this.chartContainerHeight = baseHeight + (this.barChartLabels.length * heightPerLabel);
  }

  getDefaultColor(seriesName: string): string {
    if (seriesName === 'Income' || seriesName === 'CREDIT') return 'rgba(75, 192, 192, 0.8)';
    if (seriesName === 'Expense' || seriesName === 'DEBIT') return 'rgba(255, 99, 132, 0.8)';
    return 'rgba(54, 162, 235, 0.8)';
  }

  public chartClicked({ event, active }: { event?: ChartEvent, active?: any[] }): void {
    if (active && active.length > 0) {
      const datasetIndex = active[0]?.datasetIndex;
      const dataIndex = active[0]?.index;
      if (datasetIndex !== undefined && dataIndex !== undefined && this.barChartLabels) {
        const label = this.barChartLabels[dataIndex];
        this.event.emit({ seriesIndex: datasetIndex, label: label, isSelected: true });
      }
    } else {
    }
  }

  getFormatedNumbers(num: number): string {
    return formatNumberWithCurrencySuffix(num, this._settingsService.currencySymbol) 
  };
}