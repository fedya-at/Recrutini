// notification.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<string>();

  notify(userId: string, message: string): void {
    this.notificationSubject.next(`${userId}:${message}`);
  }

  getNotification(): Observable<{ userId: string; message: string }> {
    return this.notificationSubject.asObservable().pipe(
      map((fullMessage) => {
        const [userId, message] = fullMessage.split(':');
        return { userId, message };
      })
    );
  }
}
