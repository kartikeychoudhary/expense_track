import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { MainComponent } from './pages/main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { VisualizeComponent } from './pages/visualize/visualize.component';
import { navItems } from './utils/application.constant';
import { NavItem } from './modals/nav-item.modal';

const routes: Routes = [
  ...navItems.map((item: NavItem) => ({
    path: item.route,
    component: item.component
  })),
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
