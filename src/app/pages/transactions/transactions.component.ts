import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
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

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
  };

  public colDefs: ColDef<Transaction>[] = [
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
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
    { date: '2024-01-05', description: 'Client Project', category: 'Income', amount: 1200.00, account: 'Savings' },
  ];

  constructor() {}

}
