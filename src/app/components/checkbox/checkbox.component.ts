import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-checkbox',
  standalone: false,
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent implements ICellRendererAngularComp {
  public params: ICellRendererParams;
  public checked: boolean = false;
  actionTriggered: Function;

  agInit(params): void {
    this.params = params;
    // Assuming the value for the checkbox state comes from the data
    // You might need to adjust this based on your actual data structure
    this.actionTriggered = params?.actionTriggered
    this.checked = this.params.value === true || this.params.node.isSelected();
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    // Update checked state on refresh
    this.checked = this.params.value === true || this.params.node.isSelected();
    // Return true to tell ag-Grid the component refreshed successfully
    return true;
  }

  // Optional: Add a method to handle checkbox changes if needed
  onChange(event: any): void {
    const isChecked = event.target.checked;
    // Example: Select/deselect the row when the checkbox changes
    this.params.node.setSelected(isChecked);
    this.actionTriggered({action:'checkboxClicked', rowData:this.params.data, cell: this.params.colDef.field, value: isChecked});
    // You might want to emit an event or call a service here
  }
}
