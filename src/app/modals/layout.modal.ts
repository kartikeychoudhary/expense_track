import { CardFilters } from "./card-filter.modal";

export class CardLayout {
    function:string;
    dimension:string;
    dateOptions: {
        timeFrame: string;
        dateType: string;
        range:{
            start: number;
            end: number;
            dynamic: number;
        }
    }
    filters: CardFilters;
}