import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ThemeEngineService } from '../../services/theme-engine.service';
import { Subscription } from 'rxjs';
import { Theme } from '../../utils/application.helper';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit, OnDestroy {
  private themeEngine = inject(ThemeEngineService);
  private themeSubscription: Subscription | null = null;
  
  themes = Object.values(Theme);
  selectedTheme!: Theme;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  ngOnInit(): void {
    this.themeSubscription = this.themeEngine.getThemeObservable().subscribe(theme => {
      if (theme) {
        this.selectedTheme = theme;
      }
    });
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

  onChangePassword(): void {
    // TODO: Implement password change logic
    console.log('Password change requested');
  }
}
