import { Injectable } from '@angular/core';
import { DeviceType } from '../utils/application.constant';

@Injectable({
  providedIn: 'root'
})
export class LayoutManagerService {
  private view_width: number = 0; 
  private view_height: number = 0;
  private device_type: DeviceType = DeviceType.DESKTOP;

  constructor() {
    this.initializeViewport();
    window.addEventListener('resize', () => this.handleResize());
  }

  private initializeViewport(): void {
    this.setViewWidth(window.innerWidth);
    this.setViewHeight(window.innerHeight);
    this.updateDeviceType();
  }

  private handleResize(): void {
    this.setViewWidth(window.innerWidth);
    this.setViewHeight(window.innerHeight);
    this.updateDeviceType();
  }

  private updateDeviceType(): void {
    const width = this.view_width;
    if (width <= 768) {
      this.device_type = DeviceType.MOBILE;
    } else if (width <= 1024) {
      this.device_type = DeviceType.TABLET;
    } else {
      this.device_type = DeviceType.DESKTOP;
    }
  }

  setViewWidth(width: number): void {
    this.view_width = width;
  }

  setViewHeight(height: number): void {
    this.view_height = height;
  }

  getViewWidth(): number {
    return this.view_width;
  }

  getViewHeight(): number {
    return this.view_height;
  }

  getDeviceType(): DeviceType {
    return this.device_type;
  }

  isMobile(): boolean {
    return this.device_type === DeviceType.MOBILE;
  }

  isTablet(): boolean {
    return this.device_type === DeviceType.TABLET;
  }

  isDesktop(): boolean {
    return this.device_type === DeviceType.DESKTOP;
  }
}
