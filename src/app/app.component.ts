import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ThemeEngineService } from './services/theme-engine.service';
import { Theme } from './utils/application.constant';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'expense_track';
  isAuthRoute: boolean = true;
  private routerSubscription!: Subscription;

  constructor(private router: Router, private themeService: ThemeEngineService) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isAuthRoute = event.urlAfterRedirects === '/auth';
    });
    this.themeService.setTheme(Theme.LIGHT);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
