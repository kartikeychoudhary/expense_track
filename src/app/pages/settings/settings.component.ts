import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ThemeEngineService } from '../../services/theme-engine.service';
import { Subscription } from 'rxjs';
import { LayoutManagerService } from '../../services/layout-manager.service';
import { ApplicationConstant, Theme } from '../../constants/application.constant';
import { SettingsManagerService } from '../../services/settings-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountFormDialogComponent } from '../../components/account-form-dialog/account-form-dialog.component';
import { Account } from '../../modals/account.modal';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit, OnDestroy {
  private themeEngine = inject(ThemeEngineService);
  private layoutService = inject(LayoutManagerService);
  private settingsService = inject(SettingsManagerService);
  private dialog = inject(MatDialog);
  private themeSubscription: Subscription | null = null;
  
  themes = Object.values(Theme);
  selectedTheme!: Theme;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  selectedCurrency!: string;
  categories: string[] = [];
  accounts: Account[] = [];
  ngOnInit(): void {
    this.themeSubscription = this.themeEngine.getThemeObservable().subscribe(theme => {
      if (theme) {
        this.selectedTheme = theme;
      }
    });
    this.initSettings();
    this.settingsService.settingsObservable.subscribe(data=>{
      switch(data.event) {
        case ApplicationConstant.EVENTS.SETTINGS_UPDATED:
          this.initSettings();
          break;
      }
    });
  }

  initSettings():void {
    this.accounts = this.settingsService.settings.accounts;
    this.categories = this.settingsService.settings.categories;
    this.selectedCurrency = this.settingsService.settings.currency;
    this.selectedTheme = this.settingsService.settings.theme;
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  onThemeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select) {
      this.themeEngine.setTheme(select.value as Theme);
      this.settingsService.settings.theme = select.value as Theme;
    }
  }

  onCurrencyChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select) {
      this.selectedCurrency = select.value;
      this.settingsService.settings.currency = this.selectedCurrency;
    }
  } 
  onChangePassword(): void {
    // TODO: Implement password change logic
    console.log('Password change requested');
  }
  isMobile(): boolean {
    return this.layoutService.isMobile();
  }
  isTablet(): boolean {
    return this.layoutService.isTablet();
  }
  isDesktop(): boolean {
    return this.layoutService.isDesktop();
  }

  get allCurrencies():string[] {
    return this.settingsService.allCurrencies;
  }

  get allCategories():string[] {
    return this.settingsService.allCategories;
  }

  get allModes():string[] {
    return this.settingsService.allModes;
  }
  
  
  onCategoriesChange(categories: string[]): void {
    this.categories = categories;
    this.settingsService.settings.categories = categories;
  }

  openAddAccountDialog(): void {
    const dialogRef = this.dialog.open(AccountFormDialogComponent, {
      width: '600px',
      data: { account: new Account(), editMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.account) {
        if(result.editMode){
          this.accounts = this.accounts.map(account => account.id === result.account.id ? result.account : account);
        }else{
          this.accounts = [...this.accounts, result.account];
        }
      }
    });
  }

  saveSettings():void {
    this.settingsService.saveSettings(this.settingsService.settings);
  }
}
