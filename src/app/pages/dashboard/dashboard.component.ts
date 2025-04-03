import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

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

  // Chart Data and Options
  // Expense Distribution (Doughnut)
  public doughnutChartLabels: string[] = [ 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [ 350, 150, 100, 200, 50, 40 ], // Example data
        backgroundColor: ['#3ABFF8', '#36D399', '#FBBD23', '#F87272', '#A991F7', '#F97316'], // DaisyUI/Tailwind colors
        hoverBackgroundColor: ['#0EA5E9', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EA580C'],
        borderColor: '#ffffff', // Use base-100 or similar for theme adaptiveness later
        hoverBorderColor: '#ffffff'
       }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Hide default legend, we use custom badges
      }
    },
    cutout: '70%' // Adjust for desired doughnut thickness
  };

  // Monthly Spending Trend (Line)
  public lineChartLabels: string[] = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul' ]; // Example labels
  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: [
      {
        data: [ 2500, 1800, 9800, 4000, 5000, 4500, 3800 ], // Example data from image
        label: 'Spending',
        fill: true,
        tension: 0.4, // Smoothes the line
        borderColor: '#6366F1', // Example color (Indigo)
        backgroundColor: 'rgba(99, 102, 241, 0.1)', // Lighter fill
        pointBackgroundColor: '#6366F1',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4F46E5'
      }
    ]
  };
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false // Hide legend if not needed
      }
    }
  };

  // Getter for Doughnut Chart Background Colors (for template type safety)
  get doughnutBackgroundColors(): string[] {
    // We know based on our data structure that backgroundColor is a string array
    return this.doughnutChartData.datasets[0]?.backgroundColor as string[] || [];
  }

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
