import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userName = 'Alex'; // Example user name

  // Stats Data
  totalBalance = 12580;
  monthlyExpenses = 4250;
  monthlyIncome = 6520;
  savingsRate = 35;

  // Percentage changes (example values)
  balanceChange = 2.5;
  expensesChange = -4.2;
  incomeChange = 1.8;
  savingsChange = 3.1;

  // Placeholder for chart data
  // TODO: Implement actual chart data and logic
  expenseDistributionData = {};
  monthlySpendingTrendData = {};

  // Recent Transactions Data
  recentTransactions = [
    { icon: 'fas fa-shopping-cart', description: 'Grocery Shopping', date: '2024-01-15', amount: -120.50, account: 'Credit Card' },
    { icon: 'fas fa-briefcase', description: 'Salary Deposit', date: '2024-01-14', amount: 3000.00, account: 'Savings' },
    { icon: 'fas fa-film', description: 'Netflix Subscription', date: '2024-01-13', amount: -15.99, account: 'Credit Card' },
    { icon: 'fas fa-gas-pump', description: 'Gas Station', date: '2024-01-12', amount: -45.00, account: 'Debit Card' }, // Changed from image for variety
    { icon: 'fas fa-utensils', description: 'Restaurant', date: '2024-01-11', amount: -65.30, account: 'Credit Card' },
  ];

  constructor() { }
}
