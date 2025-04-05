import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { BulkUploadComponent } from './pages/bulk-upload/bulk-upload.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { VisualizeComponent } from './pages/visualize/visualize.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: TransactionsComponent, canActivate: [authGuard] }, // Protected route
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }, // Protected route
  { path: 'visualize', component: VisualizeComponent, canActivate: [authGuard] }, // Protected route
  { path: 'upload', component: BulkUploadComponent, canActivate: [authGuard] }, // Protected route
  { path: 'transactions', component: TransactionsComponent, canActivate: [authGuard] }, // Protected route
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] }, // Protected route
  { path: 'tasks', component: TasksComponent, canActivate: [authGuard] }, // Protected route
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LayoutComponent } from './pages/layout/layout.component';
// import { MainComponent } from './pages/main/main.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { TransactionsComponent } from './pages/transactions/transactions.component';
// import { SettingsComponent } from './pages/settings/settings.component';
// import { VisualizeComponent } from './pages/visualize/visualize.component';
// import { navItems } from './utils/application.constant';
// import { NavItem } from './modals/nav-item.modal';

// const routes: Routes = [
//   ...navItems.map((item: NavItem) => ({
//     path: item.route,
//     component: item.component
//   })),
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full'
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
