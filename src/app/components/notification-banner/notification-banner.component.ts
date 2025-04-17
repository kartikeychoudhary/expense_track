import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service'; // Adjust path if needed
import { NOTIFICATION_TYPES } from '../../constants/application.constant';
import { animate, style, transition, trigger } from '@angular/animations';
import { fadeSlideInOut } from '../../animations/fadeSlideInOut.animation';

@Component({
  selector: 'app-notification-banner',
  standalone: false, // Assuming this component is part of a module
  templateUrl: './notification-banner.component.html',
  // Add styleUrls if you have specific styles: ['./notification-banner.component.css']
  animations: fadeSlideInOut.animations,
})
export class NotificationBannerComponent implements OnInit, OnDestroy {
  isVisible = false;
  message: string = '';
  type: NOTIFICATION_TYPES = NOTIFICATION_TYPES.INFO; // Default type
  public types = NOTIFICATION_TYPES; 
  private notificationSubscription: Subscription | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService.notification$.subscribe(
      (notification) => {
        if (notification) {
          this.message = notification.message;
          this.type = notification.type;
          this.isVisible = true;
        } else {
          // Received null, hide the banner
          this.isVisible = false;
          // Optionally reset message/type after hiding animation (if any)
          // setTimeout(() => {
          //   this.message = '';
          //   this.type = 'info';
          // }, 300); // Adjust timing based on animation
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  // Optional: Manual close button functionality
  closeBanner(): void {
    this.isVisible = false;
    // If you want manual close to also clear the queue or current timer,
    // you might need to add a method to NotificationService like `clearCurrentNotification()`
    // and call it here. For now, it just hides the current one.
  }
}
