import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { MainComponent } from './pages/main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ChartComponent } from './components/chart/chart.component';
import { AgGridActionsComponent } from './components/ag-grid-actions/ag-grid-actions.component';
import { TransactionModalComponent } from './components/transaction-modal/transaction-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MainComponent,
    DashboardComponent,
    SettingsComponent,
    SideBarComponent,
    TransactionsComponent,
    ChartComponent,
    AgGridActionsComponent,
    TransactionModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AgGridAngular
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
