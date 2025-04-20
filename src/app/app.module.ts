import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { ThemeToggleButtonComponent } from "./components/theme-toggle-button/theme-toggle-button.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AreaComponent } from "./components/charts/area/area.component";
import { LineComponent } from "./components/charts/line/line.component";
import { ColumnComponent } from "./components/charts/column/column.component";
import { BarComponent } from "./components/charts/bar/bar.component";
import { PieComponent } from "./components/charts/pie/pie.component";
import { DonutComponent } from "./components/charts/donut/donut.component";
import { RadialComponent } from "./components/charts/radial/radial.component";
import { TransactionsComponent } from "./pages/transactions/transactions.component";
import { TransactionTableComponent } from "./components/transaction-table/transaction-table.component";
import { ActionButtons } from "./components/action-buttons/action-buttons.component";
import { TransactionFormDialogComponent } from "./components/transaction-form-dialog/transaction-form-dialog.component";
import { TaskTableComponent } from "./components/task-table/task-table.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FieldEditorDialogComponent } from "./components/field-editor-dialog/field-editor-dialog.component";
import { DatePickerComponent } from "./components/date-picker/date-picker.component";
import { BulkUploadComponent } from "./pages/bulk-upload/bulk-upload.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import { DecimalPipe, TitleCasePipe } from "@angular/common";
import { AgGridAngular } from "ag-grid-angular";
import { AuthInterceptor } from "./interceptor/auth.interceptor";
import { TasksComponent } from "./pages/tasks/tasks.component";
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { VisualizeComponent } from './pages/visualize/visualize.component';
import { CardComponent } from './components/card/card.component';
import { GridsterModule } from 'angular-gridster2';
import { AccountsTableComponent } from './components/accounts-table/accounts-table.component';
import { CategorySettingsComponent } from './components/category-settings/category-settings.component';
import { AccountFormDialogComponent } from './components/account-form-dialog/account-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CardSettingsFormComponent } from './components/card-settings-form/card-settings-form.component';
import { NotificationBannerComponent } from './components/notification-banner/notification-banner.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { MultiSelectListComponent } from "./components/multi-select-list/multi-select-list.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ThemeToggleButtonComponent,
    DashboardComponent,
    AreaComponent,
    LineComponent,
    ColumnComponent,
    BarComponent,
    PieComponent,
    DonutComponent,
    RadialComponent,
    TransactionsComponent,
    TransactionTableComponent,
    ActionButtons,
    TransactionFormDialogComponent,
    TaskTableComponent,
    FooterComponent,
    TasksComponent,
    FieldEditorDialogComponent,
    DatePickerComponent,
    BulkUploadComponent,
    SettingsComponent,
    VisualizeComponent,
    CardComponent,
    AccountsTableComponent,
    CategorySettingsComponent,
    AccountFormDialogComponent,
    CardSettingsFormComponent,
    NotificationBannerComponent,
    CheckboxComponent,
    MultiSelectListComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    DecimalPipe,
    TitleCasePipe,
    ReactiveFormsModule,
    AgGridAngular,
    BaseChartDirective,
    GridsterModule,
    MatDialogModule
    ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, 
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
