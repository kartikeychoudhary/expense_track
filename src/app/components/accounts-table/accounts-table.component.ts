import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Account } from '../../modals/account.modal'; // Adjust path if necessary

@Component({
  selector: 'app-accounts-table',
  standalone: false,
  templateUrl: './accounts-table.component.html',
  styleUrl: './accounts-table.component.css'
})
export class AccountsTableComponent implements OnInit {

  public gridOptions: GridOptions = {};
  private gridApi!: GridApi;

  public rowData: Account[] = [];

  // Define column definitions with inline editing enabled for relevant fields
  public colDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', editable: false, sortable: true, filter: false }, // ID usually not editable
    { headerName: 'Name', field: 'name', editable: true, sortable: true, filter: false },
    { headerName: 'Type', field: 'type', editable: true, sortable: true, filter: false }, // Consider using cellEditor: 'agSelectCellEditor' with values if you have predefined types
    { headerName: 'Description', field: 'description', editable: true, sortable: true, filter: false },
    {
      headerName: 'Actions',
      editable: false,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        // Use btn-ghost or similar for icon buttons, adjust as needed
        button.className = 'btn btn-sm btn-ghost'; 
        // Create icon element
        const icon = document.createElement('i');
        icon.className = 'fas fa-edit'; // Font Awesome edit icon class
        button.appendChild(icon); // Add icon to button
        button.addEventListener('click', () => this.onEditAction(params.data));
        return button;
      },
      width: 100, // Adjust width as needed
      pinned: 'right' // Optional: Keep actions column visible
    }
  ];

  public defaultColDef: ColDef = {
    flex: 1, // Columns resize to fit container
    minWidth: 100,
    resizable: true,
    cellClass: 'bg-base-100', // Add cell class here
    headerClass: 'bg-base-300' // Add header class here
  };

  constructor() { }

  ngOnInit(): void {
    this.gridOptions = {
      columnDefs: this.colDefs,
      rowData: this.rowData,
      defaultColDef: this.defaultColDef,
      domLayout: 'autoHeight', // Adjust grid height automatically
      stopEditingWhenCellsLoseFocus: true, // Save edits when clicking away
      onCellValueChanged: this.onCellValueChanged.bind(this), // Bind context
      onGridReady: this.onGridReady.bind(this), // Store grid API
    };

    // Load some sample data (replace with actual data loading logic)
    this.loadSampleData();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  loadSampleData(): void {
    // Example data - replace with your actual data fetching
    this.rowData = [
      new Account('acc1', 'Savings Account', 5000, 'Bank', 'NEFT', 'fa-piggy-bank', '#3498db', 'Primary savings', true, true, false),
      new Account('acc2', 'Credit Card', -1500, 'Card', 'CREDIT CARD', 'fa-credit-card', '#e74c3c', 'Visa Card', true, false, false),
      new Account('acc3', 'Wallet', 200, 'Wallet', 'UPI', 'fa-wallet', '#2ecc71', 'Digital Wallet', true, false, false),
      new Account('acc3', 'Wallet', 200, 'Wallet', 'UPI', 'fa-wallet', '#2ecc71', 'Digital Wallet', true, false, false),
      new Account('acc3', 'Wallet', 200, 'Wallet', 'UPI', 'fa-wallet', '#2ecc71', 'Digital Wallet', true, false, false),
      new Account('acc3', 'Wallet', 200, 'Wallet', 'UPI', 'fa-wallet', '#2ecc71', 'Digital Wallet', true, false, false),
    ];
    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', this.rowData);
    } else {
       // If grid is not ready yet, set it in gridOptions
       this.gridOptions.rowData = this.rowData;
    }
  }

  onCellValueChanged(event: any): void {
    // This is where you would call your save/update service
    console.log('Cell Value Changed:', event.data); // Logs the entire row data after change
    console.log(`Field '${event.colDef.field}' changed to '${event.newValue}' from '${event.oldValue}' for row ID: ${event.data.id}`);
    // Example: this.accountService.updateAccount(event.data).subscribe(...);
  }

  onEditAction(data: Account): void {
    console.log('Edit action triggered for:', data);
    // Add your logic here, e.g., open a modal, navigate to an edit page, or enable full row editing.
  }

}
