import { Injectable } from '@angular/core';
import { GlobalConfig, IndividualConfig, ToastrService } from 'ngx-toastr';

export interface toastPayload {
  message: string;
  title: string;
  ic: IndividualConfig;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommunService {
  user: any;

  constructor(private toastr: ToastrService) {
    this.toastr.toastrConfig.enableHtml = true;
  }

  showToast(toast: toastPayload) {
    this.toastr.show(
      toast.message,
      toast.title,
      toast.ic,
      'toast-' + toast.type
    );
  }

  generateMeetLink(dateTime: Date): string {
    const formattedDateTime = this.formatDateTime(dateTime);

    const meetLink = `https://meet.google.com/new?date=${formattedDateTime}`;

    return meetLink;
  }

  private formatDateTime(dateTime: Date): string {
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:00Z`;
  }
}
