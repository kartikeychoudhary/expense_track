import { Component, ViewChild, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  standalone:false
})
export class LineComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

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
    const apexSeries = [
      {
        name: "Clicks",
        data: [6500, 6418, 6456, 6526, 6356, 6456],
        color: "#1A56DB",
      },
      {
        name: "CPC",
        data: [6456, 6356, 6526, 6332, 6418, 6500],
        color: "#7E3AF2",
      },
    ];
    const apexLabels = ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'];

    this.lineChartData = {
      labels: apexLabels,
      datasets: apexSeries.map(s => ({
        data: s.data,
        label: s.name,
        borderColor: s.color,
        pointBackgroundColor: s.color,
        fill: false,
      }))
    };

    this.chart?.update();
  }

  public chartClicked({ event, active }: { event?: ChartEvent, active?: { datasetIndex: number; index: number }[] }): void {
    console.log(event, active);
  }
}
