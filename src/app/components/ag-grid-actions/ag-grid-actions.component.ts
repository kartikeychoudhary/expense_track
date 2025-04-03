import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-actions',
  standalone: false,
  templateUrl: './ag-grid-actions.component.html',
  styleUrl: './ag-grid-actions.component.css'
})
export class AgGridActionsComponent implements ICellRendererAngularComp {
  public params: ICellRendererParams | undefined;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    // Return true to tell the grid we refreshed successfully
    this.params = params;
    return true;
  }

  onEditClick(): void {
    // Implement your edit logic here
    // You can access row data via this.params.data
    console.log('Edit clicked for row: ', this.params?.data);
    // Example: Call a method on the parent component
    // this.params?.context.componentParent.editMethod(this.params.data);
  }

  onDeleteClick(): void {
    // Implement your delete logic here
    console.log('Delete clicked for row: ', this.params?.data);
    // Example: Call a method on the parent component
    // this.params?.context.componentParent.deleteMethod(this.params.data);
  }
}
