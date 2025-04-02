import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class TransactionsComponent implements OnInit {

  public allRowData: Transaction[] = [
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
  ];

  public paginatedRowData: Transaction[] = [];

  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public totalPages: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.allRowData.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    if (this.currentPage < 1) {
        this.currentPage = 1;
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRowData = this.allRowData.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  goToPreviousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  goToNextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

}
