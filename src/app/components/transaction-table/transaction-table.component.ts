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
import { Subject } from 'rxjs';
import { Transaction } from '../../modals/transaction.modal';
import { convertDateToMillis, formatDate } from '../../utils/application.helper';


@Component({
  selector: 'transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css',
  standalone:false
})
export class TransactionTableComponent {
  @Input() rowDataInput: any[];
  @Input() params: { lastDataUpdated : number, rowData: any[]}
  @Input() action: Function
  @Input() event: Subject<any>;
  gridAPI: GridApi;

  getStatusClass = (status) => {
    switch (status) {
      case 'DEBIT':
        return 'text-red-500'; // Red color
      case 'CREDIT':
        return 'text-green-500'; // Green color
      default:
        return ''; // Default class for unknown status
    }
  };

  public columnDefs: ColDef[] = [
    {field: 'id', hide: true},
    // {
    //   field: 'select',
    //   headerName: '',
    //   maxWidth: 50,
    //   checkboxSelection: (params: CheckboxSelectionCallbackParams) =>
    //     this.checkboxSelection(params),
    //   headerCheckboxSelection: (
    //     params: HeaderCheckboxSelectionCallbackParams
    //   ) => this.headerCheckboxSelection(params),
    // },
    { field: 'account' },
    { field: 'amount', maxWidth: 150, cellClass: (params) => this.getStatusClass(params.data.type) },
    { field: 'createdDate',type:'date' ,headerName:'Date', valueGetter: (params)=> formatDate(params.data.createdDate), comparator: (A, B) => convertDateToMillis(A) - convertDateToMillis(B)  },
    { field: 'type' },
    { field: 'category' },
    { field: 'transactionMode', headerName:'Mode' },
    { field: 'spendAt' },
    { field: 'description' },
    { field: 'disableForCharts', hide:true, headerName:'Disabled for charts', valueGetter: (params)=> params.data.disableForCharts+''},
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
        calledFrom: 'TRANSACTION'
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
    cellClass: 'bg-base-100', // Add cell class here
    headerClass: 'bg-base-300' // Add header class here
  };
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData!: Transaction[];
  public themeClass: string = 'ag-theme-quartz-dark';

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.event.subscribe(value=>{
      if(this.gridAPI){
        if(value['calledFrom'] && value['calledFrom'] === 'TRANSACTIONS_TABLE'){return;}
        if(value['type'] === 'LOADING'){
          if(value['value']){
            this.gridAPI.showLoadingOverlay();
          }else{
            this.gridAPI.hideOverlay();
          }
        }else if(value['type'] === 'REFRESH'){
          this.gridAPI.setGridOption('rowData', this.rowData);
        }else if(value['type'] === 'EXPORT_CSV'){
          this.gridAPI.exportDataAsCsv()
        }else if(value['type'] === 'SHOW_HIDE_COLUMN'){
          const selectedColumn = value['value'];
          const map = new Map<string, boolean>();
          selectedColumn.forEach(col=> map.set(col.title, col.isSelected));
          this.columnDefs.forEach(col=>{
            if(map.has(col.field)){
              col.hide = !map.get(col.field);
            }
          })
          this.gridAPI.setGridOption('columnDefs', this.columnDefs)
        }
      }
    })
  }
  
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.populateColumnSelection();
  }
  onGridReady(params: GridReadyEvent<Transaction>) {
    this.gridAPI = params.api;
    this.rowData = this.rowDataInput;
  }

  checkboxSelection = (params: CheckboxSelectionCallbackParams) => {
    // we put checkbox on the name if we are not doing grouping
    return params.api.getRowGroupColumns().length === 0;
  };
  headerCheckboxSelection = (params: HeaderCheckboxSelectionCallbackParams) => {
    // we put checkbox on the name if we are not doing grouping
    return params.api.getRowGroupColumns().length === 0;
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

  populateColumnSelection(){
    const keys = this.columnDefs.map(column=> {return {title:column.field, isSelected: !column.hide}});
    this.event.next({value:keys, calledFrom:'TRANSACTIONS_TABLE', type:'COLUMNS'});
  }
}
