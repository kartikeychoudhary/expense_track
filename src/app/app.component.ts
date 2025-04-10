import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LayoutManagerService } from './services/layout-manager.service';
import { ThemeEngineService } from './services/theme-engine.service';
import { HomeService } from './services/home.service';
import { SettingsManagerService } from './services/settings-manager.service';
import { Settings } from './modals/settings.modal';
import { ApplicationConstant, Theme } from './constants/application.constant';
import { GenericResponse } from './modals/generic-response.modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'expense_track';
  name = '';
  isSidebarOpen = false;
  isAuth = false;
  isLoading = true;

  public authService = inject(AuthService);
  private layoutService = inject(LayoutManagerService);
  private themeEngine = inject(ThemeEngineService);
  private homeService = inject(HomeService);
  private settingsService = inject(SettingsManagerService);
  
  @ViewChild('logoSidebar') sidebarRef!: ElementRef;
  @ViewChild('sidebarToggler') sidebarTogglerRef!: ElementRef;


  ngOnInit(): void {
    this.name = this.authService.getName();
    this.isAuth = this.authService.isAuthenticated();
    this.authService.loginEvent.subscribe(userInfo=>{
      this.isAuth = userInfo !== undefined;
      this.name = this.authService.getName();
      this.loadSettings();
    });
    if(this.isAuth){
      this.loadSettings();
    }
  }

  ngOnDestroy(): void {
    
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isSidebarOpen && 
        !this.sidebarRef.nativeElement.contains(event.target as Node) &&
        !this.sidebarTogglerRef.nativeElement.contains(event.target as Node)) {
      this.isSidebarOpen = false;
    }
  }

  loadSettings():void {
    this.isLoading = true;
    this.homeService.loadSettings().subscribe({
      next: (res) => {
        const response = res as GenericResponse<Settings>;
        const {theme, currency, categories, accounts, mode, type, settingsId} = response.payload.RESULT;
        const settings = new Settings(settingsId, theme.toLowerCase() as Theme, currency, accounts, categories, mode, type);
        this.settingsService.settings = settings;
        this.settingsService.settingsObservable.next({event:ApplicationConstant.EVENTS.SETTINGS_UPDATED, data:settings});
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }
}
