import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { getMillisForLast } from '../../utils/application.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone:false
})
export class DashboardComponent {

  rowData = [];
  isLoaded = false;
  
  multiDimChart:any;
  singleDimChart:any;

  multiDimChartSeries = [];
  multiDimChartLabels = [];

  singleDimChartSeries = [];
  singleDimChartLabels = [];

  accountSelector = [];
  account = ''
  accounts = []
  uniqueSelector = [];
  uniqueSelected = '';

  duration = '7_DAYS';
  seriesIndex = 1;

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadTransactions();
  }


  loadTransactions() {
    const millis = this.duration === 'ALL' ? 'All' : getMillisForLast(this.duration);
      this.dashboardService.getAllTransactionsForDashboard(millis).subscribe({
        next: (res) => {
          if (res['status'] === 'OK') {
            this.multiDimChart = res['payload']['RESULT']['multiDimChart']
            this.singleDimChart = res['payload']['RESULT']['singleDimChart']
            if(this.multiDimChart && this.singleDimChart && Object.keys(this.multiDimChart).length > 0 && Object.keys(this.singleDimChart).length > 0){
              this.accounts = Object.keys(this.multiDimChart);
              this.account = this.accounts[0]
              this.uniqueSelector = Object.keys(this.singleDimChart[this.account]);
              this.uniqueSelected = this.uniqueSelector[0];
              this.selector();
              this.isLoaded = true;
            }
          }
        },
        error: (err) => {
          this.isLoaded = true;
        },
    });
  }

  selector(){
    this.updateMultiDimChart();
    this.updateSingleDimChart();
  }

  updateMultiDimChart (){
    this.multiDimChartSeries = this.multiDimChart[this.account].series;
    this.multiDimChartLabels = this.multiDimChart[this.account].labels;
  }

  updateSingleDimChart(){
    this.singleDimChartSeries = this.singleDimChart[this.account][this.uniqueSelected][this.seriesIndex].series;
    this.singleDimChartLabels = this.singleDimChart[this.account][this.uniqueSelected][this.seriesIndex].labels;
  }

  handleEvent(event){
    const {label, seriesIndex, isSelected} = event;
    if(isSelected){
      this.seriesIndex = seriesIndex;
      this.uniqueSelected = label;
    }else{
      this.seriesIndex = 1;
      this.uniqueSelected = 'ALL'
    }
    this.updateSingleDimChart();
  } 
  
}
