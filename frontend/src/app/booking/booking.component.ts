import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { IndividualConfig } from 'ngx-toastr';
import { CommunService, toastPayload } from '../services/commun.service';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  user: any | null = null;
  toast!: toastPayload;
  hrs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private cs: CommunService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      this.loadHRs();
      if (userId !== null) {
        this.userService.getUserById(userId).subscribe(
          (userData) => {
            this.user = userData;
          },
          (error) => {
            this.showToast('error', 'Error fetching user data:');
          }
        );
      } else {
        this.showToast('error', 'User ID is null.');
      }
    });
  }
  loadHRs(): void {
    this.userService.getAllHRs().subscribe(
      (data) => {
        this.hrs = data.map((hr, index) => ({ ...hr, index: index + 1 }));
      },
      (error) => {
        this.showToast('error', 'Error fetching hrs:');
      }
    );
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  getMinTime(): string {
    return '07:00'; // Minimum time allowed
  }

  getMaxTime(): string {
    return '17:00'; // Maximum time allowed
  }

  showToast(type: string, message: string) {
    this.toast = {
      message: message,
      title: '',
      type: type,
      ic: {
        timeOut: 5000,
        closeButton: true,
      } as IndividualConfig,
    };
    this.cs.showToast(this.toast);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const dateTime = this.getDateTimeFromForm(form);
      let meetLink = '';
      let address = '';

      meetLink = this.generateGoogleMeetLink(dateTime);

      const appointmentData = this.createAppointmentData(
        form,
        meetLink,
        address
      );

      this.bookAppointment(appointmentData);
      this.user = form.value;
      this.router.navigate(['/appointments']);
    } else {
      this.handleInvalidForm();
    }
  }

  private getDateTimeFromForm(form: NgForm): Date {
    const date = form.value.date;
    const time = form.value.time;
    return new Date(`${date}T${time}`);
  }

  private generateGoogleMeetLink(dateTime: Date): string {
    return this.cs.generateMeetLink(dateTime);
  }

  private createAppointmentData(
    form: NgForm,
    meetLink: string,
    address: string
  ): any {
    const selectedHrIndex = form.value.hr;
    const selectedHr = this.hrs[selectedHrIndex - 1];
    return {
      candidateId: form.value.userId,
      date: form.value.date,
      time: form.value.time,
      hrId: selectedHr._id,
      googleMeetLink: meetLink,
      address: address,
    };
  }

  private bookAppointment(appointmentData: any): void {
    this.appointmentService.createAppointment(appointmentData).subscribe(
      (response) => {
        console.log('Appointment created successfully:', response);
        this.handleSuccessBooking();
      },
      (error) => {
        console.error('Error creating appointment:', error);
        this.handleBookingError();
      }
    );
  }

  private handleSuccessBooking(): void {
    this.showToast('success', 'Appointment booked successfully!');
  }

  private handleBookingError(): void {
    this.showToast('error', 'Error booking appointment.');
  }

  private handleInvalidForm(): void {
    this.showToast('error', 'Please choose a date and time!');
  }
}
