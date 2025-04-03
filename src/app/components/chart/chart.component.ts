import { Component, Input, ViewChild, ElementRef, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, Chart, ChartOptions } from 'chart.js';

// Import necessary Chart.js components for tree-shaking
import { LineController, BarController, DoughnutController, PieController, RadarController, PolarAreaController, BubbleController, ScatterController } from 'chart.js';
import { ArcElement, LineElement, BarElement, PointElement } from 'chart.js';
import { CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale } from 'chart.js';
import { Legend, Title, Tooltip, Filler } from 'chart.js';

// Register the components
Chart.register(
  LineController, BarController, DoughnutController, PieController, RadarController, PolarAreaController, BubbleController, ScatterController,
  ArcElement, LineElement, BarElement, PointElement,
  CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale,
  Legend, Title, Tooltip, Filler
);

@Component({
  selector: 'app-chart',
  standalone: false,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas: ElementRef | undefined;
  private chartInstance: Chart | undefined;

  @Input() chartType: ChartType = 'line';
  @Input() chartData: ChartData | undefined;
  @Input() chartOptions: ChartOptions | undefined;

  constructor() { }

  ngOnInit(): void {
    // Delay creation slightly to ensure canvas is available after view init
    setTimeout(() => this.createChart(), 0); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Update chart if data/options change *after* initial creation
    if (this.chartInstance && (changes['chartData'] || changes['chartOptions'])) {
        this.updateChart();
    }
     // If type changes, we need to recreate
    else if (this.chartInstance && changes['chartType']) {
        this.createChart(); // Recreate if type changes
    }
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private createChart(): void {
    if (this.chartCanvas && this.chartData) {
      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      if (ctx) {
        this.destroyChart(); // Ensure previous instance is destroyed
        try {
          this.chartInstance = new Chart(ctx, {
            type: this.chartType,
            data: this.chartData,
            options: this.chartOptions || {}
          });
        } catch (error) {

        }
      } else {

      }
    } else {

    }
  }

   private updateChart(): void {
    if (this.chartInstance && this.chartData) {
      this.chartInstance.data = this.chartData;
      this.chartInstance.options = this.chartOptions || {};
      this.chartInstance.update();
    }
  }

   private destroyChart(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = undefined;
    }
  }

  // Optional: Add methods for chart events if needed
  // public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }
}
