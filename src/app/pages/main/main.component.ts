import { Component, inject } from '@angular/core';
import { ThemeEngineService } from '../../services/theme-engine.service';
import { Theme } from '../../utils/application.constant';
import { LayoutManagerService } from '../../services/layout-manager.service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  private layoutManager = inject(LayoutManagerService);
  private themeEngine = inject(ThemeEngineService);
  
  constructor() {
    this.themeEngine.setTheme(Theme.LIGHT);
  }
}
