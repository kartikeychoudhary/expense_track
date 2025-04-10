import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Account } from '../../modals/account.modal'; // Adjust path if necessary
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { AccountFormDialogComponent } from '../account-form-dialog/account-form-dialog.component'; // Import the dialog
import { SettingsManagerService } from '../../services/settings-manager.service';

@Component({
  selector: 'app-accounts-table',
  standalone: false,
  templateUrl: './accounts-table.component.html',
  styleUrl: './accounts-table.component.css'
})
export class AccountsTableComponent implements OnInit {
  private settingsService = inject(SettingsManagerService);

  public gridOptions: GridOptions = {};
  private gridApi!: GridApi;
  private dialog = inject(MatDialog); // Inject MatDialog

  public rowData: any[] = [];

  @Input() accounts: Account[] = [];

  // Define column definitions with inline editing enabled for relevant fields
  public colDefs: ColDef[] = [
    { headerName: 'ID', field: 'accountId', sortable: true, filter: false, hide: true }, // ID usually not editable
    { headerName: 'Name', field: 'uniqueName', sortable: true, filter: false },
    { headerName: 'Type', field: 'type', sortable: true, filter: false }, // Consider using cellEditor: 'agSelectCellEditor' with values if you have predefined types
    { headerName: 'Description', field: 'description', sortable: true, filter: false },
    { headerName: 'Balance', field: 'balance', sortable: true, filter: false },
    { headerName: 'Issuer', field: 'issuer', sortable: true, filter: false },
    { 
      headerName: 'Placeholder', 
      field: 'icon', 
      sortable: true, 
      filter: false,
      cellRenderer: (params: any) => {
        const icon = document.createElement('i');
        icon.className = `fas ${params.value} fa-xl`;
        icon.style.color = params.data.color;
        return icon;
      }
    },
    {
      headerName: 'Actions',
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        // Use btn-ghost or similar for icon buttons, adjust as needed
        button.className = 'btn btn-sm btn-ghost text-primary'; 
        // Create icon element
        const icon = document.createElement('i');
        icon.className = 'fas fa-edit fa-xl'; // Font Awesome edit icon class
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
      defaultColDef: this.defaultColDef,
      domLayout: 'autoHeight',
      stopEditingWhenCellsLoseFocus: true,
      onCellValueChanged: this.onCellValueChanged.bind(this),
      onGridReady: this.onGridReady.bind(this),
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accounts'] && this.gridApi) {
      this.gridApi.setGridOption('rowData', this.accounts);
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    if (this.accounts) {
      this.gridApi.setGridOption('rowData', this.accounts);
    }
  }

  onCellValueChanged(event: any): void {
    // This is where you would call your save/update service
    console.log('Cell Value Changed:', event.data); // Logs the entire row data after change
    console.log(`Field '${event.colDef.field}' changed to '${event.newValue}' from '${event.oldValue}' for row ID: ${event.data.id}`);
    // Example: this.accountService.updateAccount(event.data).subscribe(...);
  }

  onEditAction(accountToEdit: Account): void {
    console.log('Edit action triggered for:', accountToEdit);
    const dialogRef = this.dialog.open(AccountFormDialogComponent, {
      width: '600px',
      // Pass a clone of the account data to avoid modifying the grid data directly before saving
      data: { account: { ...accountToEdit }, editMode: true } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.account) {
        this.accounts = this.accounts.map(account => account.id === result.account.id ? result.account : account);
        this.gridApi.setGridOption('rowData', this.accounts);
        this.settingsService.settings.accounts = this.accounts;
      }
    });
  }

}
