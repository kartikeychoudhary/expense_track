export interface Task {
    taskId?:number;
    status?:string;
    createdDate?:number;
    startDate?:number;
    endDate?:number;
    type?:string;
    request?:string;
    response?:string;
    executionTime?:number;
    deleted?:boolean;
}