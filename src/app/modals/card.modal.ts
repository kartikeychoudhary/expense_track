import {  ChartType } from "chart.js";
import { Gridster } from "./gridster.modal";
import { CardLayout } from "./layout.modal";
import { Chart } from "./chart.modal";

export class Card {
    id:string;
    title:string
    chart:Chart
    refresh: Function;
    gridsterConfig: Gridster;
    layout: CardLayout

    constructor(gridsterConfig: Gridster, title:string, isSampleCard?:boolean) {
        this.id = isSampleCard ? 'SAMPLE_CARD' : new Date().getTime().toString() + Math.random().toString(36).substring(2, 10);
        this.gridsterConfig = gridsterConfig;
        this.title = title;
        this.chart = new Chart();
        this.layout = new CardLayout();
        this.layout.function = 'sum';
        this.layout.dimension = 'transactionType';
        this.layout.dateOptions = {
            timeFrame: 'month',
            dateType: 'this_month',
            range: {
                dynamic: new Date().getTime(),
                start: new Date().getTime(),
                end: new Date().getTime()
            }
        };
        this.layout.filters = {
            accounts: ['all'],
            categories: ['all'],
            transactionModes: ['all'],
            transactionTypes: ['all']
        };
    }

    updateCard(card: Card) {
        this.gridsterConfig = card.gridsterConfig;
        this.title = card.title;
        this.chart = card.chart;
        this.layout = card.layout;
    }

    static getCardFromJson(json: any): Card {
        const card = new Card(new Gridster(json.gridsterConfig.cols, json.gridsterConfig.rows, json.gridsterConfig.x, json.gridsterConfig.y), json.title);
        card.id = json.id;
        card.chart.type = json.chart.type;
        card.chart.data.series = json.chart?.data?.series;
        card.chart.data.labels = json.chart?.data?.labels;
        card.chart.options = json.chart?.options;
        card.layout.function = json.layout.function;
        card.layout.dimension = json.layout.dimension;
        card.layout.dateOptions.timeFrame = json.layout.dateOptions.timeFrame;
        card.layout.dateOptions.dateType = json.layout.dateOptions.dateType;
        card.layout.dateOptions.range.dynamic = json.layout.dateOptions.range.dynamic;
        card.layout.dateOptions.range.start = json.layout.dateOptions.range.start;
        card.layout.dateOptions.range.end = json.layout.dateOptions.range.end;
        card.layout.filters.accounts = json.layout.filters.accounts;
        card.layout.filters.categories = json.layout.filters.categories;
        card.layout.filters.transactionModes = json.layout.filters.transactionModes;
        card.layout.filters.transactionTypes = json.layout.filters.transactionTypes;
        return card;
    }
}

