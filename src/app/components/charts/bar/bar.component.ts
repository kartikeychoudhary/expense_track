import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType, ActiveElement } from 'chart.js';
import { SettingsManagerService } from '../../../services/settings-manager.service';
import { formatNumberWithCurrencySuffix } from '../../../utils/application.helper';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  standalone:false
})
export class BarComponent implements OnInit, OnChanges {
  
  private _settingsService: SettingsManagerService = inject(SettingsManagerService);
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() series: {name: string, color:string, data:number[]}[] = [];
  @Input() labels: string[] = [];
  @Input() orientation: string = 'horizontal';
  @Output() event = new EventEmitter<{seriesIndex: number, label: string, isSelected: boolean}>();

  public currentStyles = {};

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    maintainAspectRatio: false,
    indexAxis: this.orientation === 'horizontal' ? 'x' : 'y',
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
        // intersect: true,
        callbacks: {
          label: (context) => {
            const value = this.orientation === 'horizontal' ? context.parsed.y : context.parsed.x;
            return this.getFormatedNumbers(value)
          }
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['series'] || changes['labels'] || changes['orientation']) {
      if(changes['orientation']){
        this.barChartOptions.indexAxis = this.orientation === 'horizontal' ? 'x' : 'y';
      }
      this.updateStyle()
      this.updateChartData();
      this.chart?.update();
    }
  }
  updateChartData(): void {
    this.barChartLabels = this.labels || [];
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: this.series.map(s => {
        {
          return {
            data: s.data,
            label: s.name,
            backgroundColor: s.color || this.getDefaultColor(s.name),
            borderColor: s.color || this.getDefaultColor(s.name),
            borderWidth: 1,
          }
        }
      })
    };
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
  
  updateStyle(){
    this.currentStyles = {'height':'100%', width:'100%'}
    const offset = Math.max(30*this.labels.length*this.series.length, 200) + 'px';
    const key = this.barChartOptions.indexAxis === 'x' ? 'width' : 'height';
    this.currentStyles[key] = offset;
  }
}