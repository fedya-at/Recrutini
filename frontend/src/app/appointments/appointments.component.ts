import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { AppointmentService } from '../services/appointment.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { IndividualConfig } from 'ngx-toastr';
import { CommunService, toastPayload } from '../services/commun.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  toast!: toastPayload;
  appointments: CalendarEvent[] = [];
  viewDate: Date = new Date();
  selectedDate: Date | null = null;
  selectedDateAppointments: any[] = [];
  editedAppointment: any = {};
  hrList: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private userService: UserService,
    private cs: CommunService,
    private router: Router
  ) {}

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
  ngOnInit(): void {
    this.loadAppointments();
  }
  loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe((appointments) => {
      this.appointments = appointments.map((appointment) => ({
        start: new Date(appointment.date),
        title: ` ${appointment.hrId || 'Unknown HR'},  ${
          appointment.candidateId || 'Unknown Candidate'
        }`,
        meta: appointment,
      }));
    });
  }

  loadCandidat(candidateId: string): void {
    this.userService.getUserById(candidateId).subscribe((user) => {
      const candidateInfo = ` ${user.firstName} ${user.lastName}`;
      console.log(candidateInfo);

      this.selectedDateAppointments.forEach((appointment) => {
        if (appointment.candidateId === candidateId) {
          appointment.candidateInfo = candidateInfo; // Add candidateInfo property
        }
      });
    });
  }

  loadHr(hrId: string): void {
    this.userService.getUserById(hrId).subscribe((user) => {
      const hrInfo = `${user.firstName} ${user.lastName}`;
      this.selectedDateAppointments.forEach((appointment) => {
        if (appointment.hrId === hrId) {
          appointment.hrInfo = hrInfo;
        }
      });
    });
  }

  dayClicked({
    day,
  }: {
    day: CalendarMonthViewDay;
    sourceEvent: MouseEvent | KeyboardEvent;
  }): void {
    this.selectedDate = day.date;
    this.selectedDateAppointments = day.events.map((event: any) => {
      const { _id, time, hrId, candidateId } = event.meta;
      if (hrId) {
        this.loadHr(hrId);
      }
      if (candidateId) {
        this.loadCandidat(candidateId);
      }

      return {
        id: _id,
        time: time,
        hrId: hrId || 'Unknown HR',
        candidateId: candidateId || 'Unknown Candidate',
        googleMeetLink: event.meta.googleMeetLink || 'N/A',
      };
    });
  }

  editAppointment(appointment: any): void {
    this.editedAppointment = { ...appointment };
  }
  onEditSubmit(): void {
    if (this.editedAppointment._id) {
      this.appointmentService
        .updateAppointment(this.editedAppointment._id, this.editedAppointment)
        .subscribe(
          (data) => {
            this.loadAppointments();
            this.showToast('success', 'Appointment updated successfully');
          },
          (error) => {
            this.showToast('error', error.message);
          }
        );
    } else {
      this.showToast('error', 'Invalid appointment data');
    }
  }
  deleteAppointment(appointmentId: string): void {
    const confirmation = confirm(
      'Are you sure you want to delete this appointment?'
    );

    if (confirmation) {
      this.appointmentService.deleteAppointment(appointmentId).subscribe(
        () => {
          this.showToast('success', 'Appointment deleted successfully.');
          this.loadAppointments();

          // Reload the page after a short delay
          setTimeout(() => {
            location.reload();
          }, 500); // You can adjust the delay as needed
        },
        (error) => {
          this.showToast('error', 'Error deleting appointment:');
        }
      );
    }
  }

  addAppointment(): void {
    this.router.navigate(['/interview']);
  }
}
