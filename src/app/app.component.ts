import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LayoutManagerService } from './services/layout-manager.service';
import { ThemeEngineService } from './services/theme-engine.service';

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

  @ViewChild('logoSidebar') sidebarRef!: ElementRef;
  @ViewChild('sidebarToggler') sidebarTogglerRef!: ElementRef;

  constructor(public authService: AuthService, private layoutService: LayoutManagerService, private themeEngine: ThemeEngineService) {}

  ngOnInit(): void {
    this.name = this.authService.getName();
    this.isAuth = this.authService.isAuthenticated();
    this.authService.loginEvent.subscribe(userInfo=>{
      this.isAuth = userInfo !== undefined;
      this.name = this.authService.getName();
    });
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
}
