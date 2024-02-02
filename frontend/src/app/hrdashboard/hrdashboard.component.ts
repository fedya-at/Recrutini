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
  activeSection: string = 'applications-section';
  applications: any[] = [];
  setActiveSection(section: string): void {
    this.activeSection = section;
  }
  userInfo: any;
  toast!: toastPayload;

  constructor(
    private applicationService: ApplicationService,
    private userService: UserService,
    private offerService: OffreService,
    private router: Router,
    private cs: CommunService
  ) {}

  ngOnInit(): void {
    this.loadApplications(); // Add this line to load applications

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

  loadApplications(): void {
    this.applicationService.getAllApplications().subscribe(
      (applications) => {
        this.applications = applications;
      },
      (error) => {
        console.error('Error fetching applications:', error);
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

  markAsSeen(application: any): void {
    // Update the application's etat to "seen"
    application.etat = 'seen';

    // Call the updateApplication method to persist the changes
    this.applicationService
      .updateApplication(application._id, application)
      .subscribe(
        (data) => {
                  this.showToast('warning', application._id);
      console.log('Application updated successfully:', data);

        this.router.navigate(['/application', String(application._id)]);
          this.showToast('success', 'Application marked as seen successfully');
        },
        (error) => {
          this.showToast('error', error.message);
        }
      );
  }
  getCardColor(etat: string): string {
    // Return the appropriate color based on the etat
    switch (etat) {
      case 'unseen':
        return '#8d99ae'; // Change to your desired color
      case 'seen':
        return '#fee440'; // Change to your desired color
      case 'approved':
        return '#57cc99'; // Change to your desired color
      case 'refused':
        return '#f07167'; // Change to your desired color
      default:
        return 'white'; // Default color
    }
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
}
