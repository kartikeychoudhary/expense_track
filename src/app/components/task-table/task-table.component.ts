import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import {
  CheckboxSelectionCallbackParams,
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  HeaderCheckboxSelectionCallbackParams,
  IGroupCellRendererParams,
} from 'ag-grid-community';
import { ActionButtons } from '../action-buttons/action-buttons.component';
import { Task } from '../../modals/task.modal';
import { formatDate, formatExecutionTime } from '../../utils/application.helper';
import { Subject } from 'rxjs';
@Component({
  selector: 'task-table',
  templateUrl: './task-table.component.html',
  standalone:false
})
export class TaskTableComponent {

  getStatusClass = (status) => {
    switch (status) {
      case 'FAILED':
        return 'text-red-500'; // Red color
      case 'OPEN':
        return 'text-yellow-500'; // Red color
      case 'COMPLETED':
        return 'text-green-500'; // Green color
      case 'IN_PROGRESS':
        return 'text-blue-500'; // Blue color
      default:
        return ''; // Default class for unknown status
    }
  };

  @Input() rowDataInput: any[];
  @Input() params: { lastDataUpdated : number, rowData: any[]}
  @Input() action: Function;
  @Input() event: Subject<any>;
  gridAPI: GridApi;

  public columnDefs: ColDef[] = [
    {field: 'taskId', hide: true},
    {
      field: 'select',
      headerName: '',
      maxWidth: 50,
      checkboxSelection: (params: CheckboxSelectionCallbackParams) =>
        this.checkboxSelection(params),
      headerCheckboxSelection: (
        params: HeaderCheckboxSelectionCallbackParams
      ) => this.headerCheckboxSelection(params),
    },
    { field: 'status', cellClass: (params) => this.getStatusClass(params.value) },
    { field: 'request' },
    { field: 'response', onCellClicked:(params)=> this.onAction({action:'cellClicked', rowData:params.data, cell: params.colDef.field}) },
    { field: 'type' },
    { field: 'createdDate', valueFormatter: (params)=> formatDate(params.value)},
    { field: 'startDate', valueFormatter: (params)=> formatDate(params.value)},
    { field: 'endDate', valueFormatter: (params)=> formatDate(params.value) },
    { field: 'executionTime', valueFormatter: (params)=> formatExecutionTime(params.value) },
    {
      field: 'action',
      headerName: 'Action',
      cellClass: 'overflow-visible',
      cellRendererSelector: (params) => {
        return {
          component: ActionButtons,
        }
      },
      cellRendererParams: {
        actionTriggered: this.onAction.bind(this),
        calledFrom: 'TASK'
      },
    },
  ];
  public autoGroupColumnDef: ColDef = {
    headerName: 'Group',
    minWidth: 170,
    field: 'athlete',
    valueGetter: (params) => {
      if (params.node!.group) {
        return params.node!.key;
      } else {
        return params.data[params.colDef.field!];
      }
    },
    headerCheckboxSelection: true,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    } as IGroupCellRendererParams,
  };
  public defaultColDef: ColDef = {
    editable: false,
    enableRowGroup: false,
    enablePivot: false,
    enableValue: false,
    filter: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
  };
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData!: Task[];
  public themeClass: string = 'ag-theme-quartz-dark';

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.event.subscribe(value=>{
      if(this.gridAPI && value['type'] === 'LOADING'){
        if(value['value']){
          this.gridAPI.showLoadingOverlay();
        }else{
          this.gridAPI.hideOverlay();
        }
      }else if(this.gridAPI && value['type'] === 'REFRESH'){
        this.gridAPI.setGridOption("rowData", this.rowData);
      }
    })
  }

  onGridReady(params: GridReadyEvent<Task>) {
    this.gridAPI = params.api;
    this.rowData = this.rowDataInput;
  }

  checkboxSelection = (params: CheckboxSelectionCallbackParams) => {
    // we put checkbox on the name if we are not doing grouping
    const isGroupingActive = params.api.getColumnState()?.some(col => col.rowGroupIndex != null);
    return !isGroupingActive;
  };
  headerCheckboxSelection = (params: HeaderCheckboxSelectionCallbackParams) => {
    // we put checkbox on the name if we are not doing grouping
    const isGroupingActive = params.api.getColumnState()?.some(col => col.rowGroupIndex != null);
    return !isGroupingActive;
  };

  onAction(params:any) {
    this.action(params);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.gridAPI){
      this.rowData = this.rowDataInput;
    }
  }
}
