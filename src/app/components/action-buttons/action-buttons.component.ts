import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AgPromise, ICellRendererComp, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'action-buttons',
  templateUrl: './action-buttons.component.html',
  standalone:false
})
export class ActionButtons  implements ICellRendererAngularComp{
  calledFrom: string;
  isStartTaskDisabled: boolean = false;
  actionTriggered: (rowData:any) => void;

  params: ICellRendererParams;
  agInit(params): void {
    // throw new Error('Method not implemented.');
    this.params = params;
    this.actionTriggered = params?.actionTriggered
    this.calledFrom = params?.calledFrom
    if((params.data['status'] && params.data['status']!== 'OPEN')){
      this.isStartTaskDisabled = true;
    }
    if((params.data['status'] && params.data['status'] === 'COMPLETED' && params.data['type'] === 'GEN_AI')){
      this.isStartTaskDisabled = false;
    }
   
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }

  onEditClick() {
    const editData = { // Prepare data for edit action (e.g., row data, field)
      rowData: this.params.data,
    };
    this.actionTriggered({ action: 'edit', data: editData });
  }
  
  onDeleteClick() {
    if (confirm('Are you sure you want to delete this row?')) {
      const deleteData = this.params.data; // Selected row data for deletion
      this.actionTriggered({ action: 'delete', data: deleteData });
    }
  }

  onStartClick() {
    if(this.isStartTaskDisabled){return;}
    const startData = { // Prepare data for edit action (e.g., row data, field)
      rowData: this.params.data,
    }
    this.actionTriggered({ action: 'start', data: startData });
  
  }
  
}
