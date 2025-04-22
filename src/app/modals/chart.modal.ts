import { ChartDataset, ChartOptions, ChartType, Plugin } from "chart.js"

export class Chart {
    type: string;
    data: {series:any[], labels: string[]};
    options: ChartOptions;
    plugins?: Plugin;
    isDataLoaded: boolean;
    constructor() {
        this.type = 'bar';
        this.data = {series: [], labels: []};
        this.options = {};
        this.isDataLoaded = false;
    }
}
