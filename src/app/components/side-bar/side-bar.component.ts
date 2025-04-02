import { Component, HostListener } from '@angular/core';
import { LayoutManagerService } from '../../services/layout-manager.service';
import { DeviceType } from '../../utils/application.constant';
import { navItems } from '../../utils/application.constant';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  isOpen: boolean = true;
  navItems = navItems;

  constructor(public layoutManager: LayoutManagerService) {
    this.initializeSidebar();
  }

  private initializeSidebar(): void {
    if (this.layoutManager.isMobile()) {
      this.isOpen = false;
    }
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.layoutManager.isDesktop()) {
      this.isOpen = true;
    } else {
      this.isOpen = false; 
    }
  }

  closeSidebarOnClickOutside(): void {
    if (this.layoutManager.isMobile() && this.isOpen) {
      this.isOpen = false;
    }
  }
}
