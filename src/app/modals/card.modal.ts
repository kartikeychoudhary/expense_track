import { ChartTypes } from "../constants/application.constant";
import { CardFilters } from "./card-filter.modal";
import { Gridster } from "./gridster.modal";

export class Card {
    gridsterConfig: Gridster;
    chartType: ChartTypes;
    filters: CardFilters;
    chartData: any;
    chartOptions: any;
    fetchCardData: Function;
    title:string

    constructor(gridsterConfig: Gridster, title:string) {
        this.gridsterConfig = gridsterConfig;
        this.title = title;
        this.filters = new CardFilters();
        this.chartData = null;
        this.chartOptions = null;
        this.chartType = ChartTypes.LINE;
    }
}

