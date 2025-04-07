import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ThemeEngineService } from '../../services/theme-engine.service';
import { Subscription } from 'rxjs';
import { LayoutManagerService } from '../../services/layout-manager.service';
import { Theme } from '../../constants/application.constant';
import { SettingsManagerService } from '../../services/settings-manager.service';

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
  private themeSubscription: Subscription | null = null;
  
  themes = Object.values(Theme);
  selectedTheme!: Theme;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  selectedCurrency!: string;

  ngOnInit(): void {
    this.themeSubscription = this.themeEngine.getThemeObservable().subscribe(theme => {
      if (theme) {
        this.selectedTheme = theme;
      }
    });
    this.selectedCurrency = this.settingsService.getCurrentCurrency();
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
    }
  }

  onCurrencyChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select) {
      this.selectedCurrency = select.value;
      this.settingsService.setCurrency(this.selectedCurrency);
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
}
