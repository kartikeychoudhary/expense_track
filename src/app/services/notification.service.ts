import { Injectable } from '@angular/core';
import { Subject, timer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Notification } from '../modals/notification.modal';
import { ApplicationConstant, NOTIFICATION_TYPES } from '../constants/application.constant';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification | null>();
  private notificationQueue: Notification[] = [];
  private isDisplaying = false;
  private timerSubscription: Subscription | null = null;

  notification$ = this.notificationSubject.asObservable();

  constructor() { }

  showNotification(message: string, type: NOTIFICATION_TYPES, duration: number = ApplicationConstant.NOTIFICATION.TIMEOUT) {
    this.notificationQueue.push({ message, type, duration });
    if (!this.isDisplaying) {
      this.processQueue();
    }
  }

  private processQueue() {
    if (this.notificationQueue.length > 0 && !this.isDisplaying) {
      this.isDisplaying = true;
      const notification = this.notificationQueue.shift();

      if (notification) {
        this.notificationSubject.next(notification);

        // Cancel any previous timer
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
        }

        this.timerSubscription = timer(notification.duration || ApplicationConstant.NOTIFICATION.TIMEOUT)
          .pipe(take(1))
          .subscribe(() => {
            this.hideNotification();
          });
      } else {
         // Should not happen if queue > 0, but good practice
         this.isDisplaying = false;
      }
    }
  }

  private hideNotification() {
    this.notificationSubject.next(null); // Signal to hide
    this.isDisplaying = false;
    this.timerSubscription = null;
    // Check if there are more notifications waiting
    setTimeout(() => {
      if (this.notificationQueue.length > 0) {
        this.processQueue();
      }
    }, 500);
    
  }
}
