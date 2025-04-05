import { Component, ViewChild, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType, ActiveElement } from 'chart.js';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  standalone:false
})
export class ColumnComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public columnChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        stacked: false,
        grid: { display: false },
        ticks: { display: true }
      },
      y: {
        stacked: false,
        grid: { display: true },
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
      },
    },
  };
  public columnChartType: ChartType = 'bar';
  public columnChartLegend = true;

  public columnChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public columnChartLabels: string[] = [];

  ngOnInit() {
    this.populateChartData();
  }

  populateChartData(){
    const apexSeries = [
      {
        name: "Organic",
        color: "#1A56DB",
        data: [
          { x: "Mon", y: 231 },
          { x: "Tue", y: 122 },
          { x: "Wed", y: 63 },
          { x: "Thu", y: 421 },
          { x: "Fri", y: 122 },
          { x: "Sat", y: 323 },
          { x: "Sun", y: 111 },
        ],
      },
      {
        name: "Social media",
        color: "#FDBA8C",
        data: [
          { x: "Mon", y: 232 },
          { x: "Tue", y: 113 },
          { x: "Wed", y: 341 },
          { x: "Thu", y: 224 },
          { x: "Fri", y: 522 },
          { x: "Sat", y: 411 },
          { x: "Sun", y: 243 },
        ],
      },
    ];

    this.columnChartLabels = apexSeries[0].data.map(item => item.x);

    this.columnChartData = {
      labels: this.columnChartLabels,
      datasets: apexSeries.map(s => ({
        data: s.data.map(item => item.y),
        label: s.name,
        backgroundColor: s.color,
        borderColor: s.color,
        borderWidth: 1,
      }))
    };

    this.chart?.update();
  }

  public chartClicked({ event, active }: { event?: ChartEvent, active?: any[] }): void {
    console.log(event, active);
    if (active && active.length > 0) {
      const datasetIndex = active[0]?.datasetIndex;
      const dataIndex = active[0]?.index;
      if (datasetIndex !== undefined && dataIndex !== undefined && this.columnChartLabels) {
        const label = this.columnChartLabels[dataIndex];
        const datasetLabel = this.columnChartData.datasets[datasetIndex]?.label;
        const value = this.columnChartData.datasets[datasetIndex]?.data[dataIndex];
        console.log(`Clicked on ${label} in dataset ${datasetLabel}, value: ${value}`);
      }
    }
  }
}
