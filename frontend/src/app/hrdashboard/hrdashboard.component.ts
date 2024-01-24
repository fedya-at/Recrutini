import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { OffreService } from '../services/offre.service';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { AppointmentService } from '../services/appointment.service';
import { Observable } from 'rxjs';
import { IndividualConfig } from 'ngx-toastr';
import { CommunService, toastPayload } from '../services/commun.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
interface ApplicationResponse {
  offer: any; // Adjust the type based on your actual data structure for the offer
  applicants: any[]; // Adjust the type based on your actual data structure for the applicants
}
@Component({
  selector: 'app-hrdashboard',
  templateUrl: './hrdashboard.component.html',
  styleUrls: ['./hrdashboard.component.css'],
})
export class HRdashboardComponent implements OnInit {
  // Adjust the type based on your actual data structure
  activeSection: string = 'applications-section';
  applications: any[] = [];
  setActiveSection(section: string): void {
    this.activeSection = section;
  }
  userInfo: any;
  toast!: toastPayload;
  appointments: CalendarEvent[] = [];
  viewDate: Date = new Date();
  selectedDate: Date | null = null;
  selectedDateAppointments: any[] = [];
  editedAppointment: any = {};
  hrList: any[] = [];

  constructor(
    private applicationService: ApplicationService,
    private offerService: OffreService,
    private userService: UserService,
    private appointmentService: AppointmentService,
    private cs: CommunService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAppointments();

    this.userService.getUserInfo().subscribe(
      (response) => {
        this.userInfo = response;
        this.loadHrOffers(this.userInfo.id);
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }

  loadHrOffers(userId: string): void {
    this.offerService.getOfferByPostedById(userId).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        this.userInfo = response;
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
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
