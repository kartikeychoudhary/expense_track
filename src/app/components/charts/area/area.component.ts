import { Component, ViewChild, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { ScriptableContext } from 'chart.js';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  standalone:false
})
export class AreaComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public areaChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { display: false }
      },
      y: {
        beginAtZero: false,
        grid: { display: false },
        border: { display: false },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      }
    }
  };
  public areaChartType: ChartType = 'line';

  public areaChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  ngOnInit() {
    this.populateChartData();
  }

  populateChartData(){
    const apexSeries = [
      {
        name: "New users",
        data: [6500, 6418, 6456, 6526, 6356, 6456],
        color: "#1A56DB",
      }
    ];
    const apexLabels = ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'];

    this.areaChartData = {
      labels: apexLabels,
      datasets: apexSeries.map(s => ({
        data: s.data,
        label: s.name,
        borderColor: s.color,
        pointBackgroundColor: s.color,
        fill: true,
        backgroundColor: (context: ScriptableContext<'line'>) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, 'rgba(26, 86, 219, 0.55)');
            gradient.addColorStop(1, 'rgba(26, 86, 219, 0)');
            return gradient;
        },
      }))
    };

    this.chart?.update();
  }

  public chartClicked({ event, active }: { event?: ChartEvent, active?: any[] }): void {
    console.log(event, active);
  }
}
