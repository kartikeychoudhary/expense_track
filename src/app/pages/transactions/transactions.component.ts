import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { AgGridActionsComponent } from '../../components/ag-grid-actions/ag-grid-actions.component';

interface Transaction {
  date: string;
  description: string;
  category: string;
  amount: number;
  account: string;
}

@Component({
  selector: 'app-transactions',
  standalone: false,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {

  // Modal State
  isModalVisible: boolean = false;
  selectedTransaction: Transaction | null = null;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
  };

  // Declare colDefs type, but initialize in constructor
  public colDefs: ColDef<Transaction>[]; 
  public rowData: Transaction[] = [
    { date: '2024-01-15', description: 'Grocery Shopping', category: 'Food', amount: -120.50, account: 'Credit Card' },
    { date: '2024-01-14', description: 'Salary Deposit', category: 'Income', amount: 3000.00, account: 'Savings' },
    { date: '2024-01-13', description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, account: 'Credit Card' },
    { date: '2024-01-12', description: 'Gas Bill', category: 'Utilities', amount: -55.20, account: 'Checking' },
    { date: '2024-01-11', description: 'Dinner Out', category: 'Food', amount: -85.00, account: 'Credit Card' },
    { date: '2024-01-10', description: 'Book Purchase', category: 'Shopping', amount: -25.00, account: 'Credit Card' },
    { date: '2024-01-09', description: 'Freelance Payment', category: 'Income', amount: 500.00, account: 'Savings' },
    { date: '2024-01-08', description: 'Coffee', category: 'Food', amount: -4.50, account: 'Checking' },
    { date: '2024-01-07', description: 'Movie Tickets', category: 'Entertainment', amount: -30.00, account: 'Credit Card' },
    { date: '2024-01-06', description: 'Gym Membership', category: 'Health', amount: -40.00, account: 'Checking' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
  ];
  public gridOptions: GridOptions; // Declare GridOptions

  constructor() {
    // Set grid options including context
    this.gridOptions = <GridOptions>{      
      context: { 
        componentParent: this 
      },
      // You can move other grid-level bindings here too if desired
      // pagination: true,
      // paginationPageSize: 10,
      // etc.
    };

    // Initialize colDefs (without context property)
    this.colDefs = [
      { field: 'date', headerName: 'Date', sort: 'desc' },
      { field: 'description', headerName: 'Description' },
      { field: 'category', headerName: 'Category' },
      {
        field: 'amount',
        headerName: 'Amount',
        cellClass: params => params.value < 0 ? 'text-error' : 'text-success',
        valueFormatter: params => {
          const absValue = Math.abs(params.value).toFixed(2);
          return params.value < 0 ? `-${absValue}` : `+${absValue}`;
        }
      },
      { field: 'account', headerName: 'Account' },
      {
        headerName: 'Actions',
        cellRenderer: AgGridActionsComponent,
        filter: false,
        sortable: false,
        resizable: false,
        width: 100,
        pinned: 'right',
        cellStyle: { textAlign: 'center' },
      }
    ];
  }

  // --- Modal Handling Methods ---

  openAddModal(): void {
    this.selectedTransaction = null; // Ensure we are adding, not editing
    this.isModalVisible = true;
  }

  openEditModal(transaction: Transaction): void {
    this.selectedTransaction = { ...transaction }; // Pass a copy to avoid direct mutation
    this.isModalVisible = true;
  }

  handleModalClose(): void {
    this.isModalVisible = false;
    this.selectedTransaction = null;
  }

  handleModalSave(transaction: Transaction): void {
    console.log('Save event received:', transaction);
    if (this.selectedTransaction) {
      // --- Edit Logic --- 
      // Find the index of the transaction to update
      const index = this.rowData.findIndex(t => t === this.selectedTransaction); // Simple reference check, might need ID check
      if (index !== -1) {
        // Update the row data immutably (important for Ag-Grid change detection)
        const updatedRowData = [...this.rowData];
        updatedRowData[index] = transaction; // Assuming the saved transaction has all necessary fields
        this.rowData = updatedRowData;
        console.log('Transaction updated', this.rowData);
        // TODO: Call an actual API service to update the backend
      } else {
        console.error('Original transaction not found for update');
      }
    } else {
      // --- Add Logic --- 
      // Add the new transaction (immutably)
      this.rowData = [...this.rowData, transaction];
      console.log('Transaction added', this.rowData);
      // TODO: Call an actual API service to add to the backend
    }

    // Optionally: Refresh grid data if not using immutable updates
    // this.gridApi?.applyTransaction({ add: [transaction] }); // or update

    this.handleModalClose(); // Close modal after save
  }

  // --- AG-Grid Specific Methods (Optional: for grid API access) ---
  // private gridApi: GridApi | undefined;
  // onGridReady(params: GridReadyEvent): void {
  //   this.gridApi = params.api;
  // }
}
