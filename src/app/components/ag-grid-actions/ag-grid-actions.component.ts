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
    console.log('[AgGridActions] onEditClick triggered');
    console.log('[AgGridActions] Params:', this.params);
    console.log('[AgGridActions] Context:', this.params?.context);
    console.log('[AgGridActions] Parent Component:', this.params?.context?.componentParent);
    console.log('[AgGridActions] openEditModal Method:', this.params?.context?.componentParent?.openEditModal);

    // Call the parent component's method via context
    if (this.params?.context?.componentParent?.openEditModal) {
       console.log('[AgGridActions] Calling openEditModal with data:', this.params.data);
       this.params.context.componentParent.openEditModal(this.params.data);
    } else {
      console.error('Parent component method or context not available for edit.');
    }
    // console.log('Edit clicked for row: ', this.params?.data);
  }

  onDeleteClick(): void {
    // Implement your delete logic here
    console.log('Delete clicked for row: ', this.params?.data);
    // Example: Call a method on the parent component
    // this.params?.context.componentParent.deleteMethod(this.params.data);
  }
}
