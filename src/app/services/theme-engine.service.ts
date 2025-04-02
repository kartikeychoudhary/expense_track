import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Theme } from '../utils/application.constant';
import { IndexDBService } from './index-db.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeEngineService {
  private readonly allThemes: readonly Theme[] = [
    Theme.LIGHT,
    Theme.DARK,
    Theme.FOREST,
    Theme.CYBERPUNK,
    Theme.FANTASY,
    Theme.BLACK,
    Theme.LUXURY,
    Theme.DRACULA,
    Theme.CMYK,
    Theme.AUTUMN,
    Theme.BUSINESS,
    Theme.ACID,
    Theme.LEMONADE,
    Theme.NIGHT,
    Theme.COFFEE,
    Theme.WINTER,
    Theme.RETRO,
    Theme.SYNTHWAVE,
    Theme.HALLOWEEN,
    Theme.GARDEN,
    Theme.AQUA,
    Theme.LOFI,
    Theme.PASTEL,
    Theme.CORPORATE,
    Theme.VALENTINE,
    Theme.WIREFRAME,
    Theme.CUPCAKE,
    Theme.BUMBLEBEE,
    Theme.EMERALD,
    Theme.CARROT,
    Theme.SUNSET,
    Theme.NEUTRAL,
    Theme.GHOST,
    Theme.SLATE
  ];
  private readonly renderer: Renderer2;
  private currentTheme: Theme | null = null;
  private themeSubject = new BehaviorSubject<Theme | null>(null);

  constructor(
    rendererFactory: RendererFactory2,
    private indexDBService: IndexDBService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadThemeFromIndexDB();
  }

  getAllThemes(): Theme[] {
    return [...this.allThemes];
  }

  private loadThemeFromIndexDB(): void {
    this.indexDBService.getItem('theme').subscribe({
      next: (savedTheme: Theme) => {
        if (savedTheme && this.allThemes.includes(savedTheme)) {
          this.currentTheme = savedTheme;
          this.themeSubject.next(savedTheme);
          this.renderer.setAttribute(document.documentElement, 'data-theme', savedTheme);
        } else {
          // If no theme is saved or invalid theme, set default
          this.currentTheme = Theme.LIGHT;
          this.themeSubject.next(Theme.LIGHT);
          this.renderer.setAttribute(document.documentElement, 'data-theme', Theme.LIGHT);
        }
      },
      error: (error) => {
        console.error('Error loading theme from IndexDB:', error);
        // On error, set default theme
        this.currentTheme = Theme.LIGHT;
        this.themeSubject.next(Theme.LIGHT);
        this.renderer.setAttribute(document.documentElement, 'data-theme', Theme.LIGHT);
      }
    });
  }

  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.themeSubject.next(theme);
    this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
    this.indexDBService.setItem('theme', theme).subscribe({
      error: (error) => {
        console.error('Error saving theme to IndexDB:', error);
      }
    });
  }

  getCurrentTheme(): Theme {
    return this.currentTheme || Theme.LIGHT;
  }

  getThemeObservable() {
    return this.themeSubject.asObservable();
  }
}
