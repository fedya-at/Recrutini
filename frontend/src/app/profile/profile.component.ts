import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ApplicationService } from '../services/application.service';
import { OffreService } from '../services/offre.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userInfo: any;
  userApplications: any[] = [];
  updatedUser: any = {};
  
  constructor(
    private userService: UserService,
    private applicationService: ApplicationService,
    private offreService: OffreService
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (response) => {
        this.userInfo = response;
        this.loadUserApplications(this.userInfo.id);
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }
  loadUserApplications(userId: string): void {
    // Fetch applications by user ID
    this.applicationService.getApplicationsByUserId(userId).subscribe(
      (applications) => {
        this.userApplications = applications.map((application: any) => {
          return {
            ...application,
            offerDetails: {}, // Placeholder for offer details
          };
        });

        // Fetch offer details for each application
        this.userApplications.forEach((application: any) => {
          this.offreService.getOfferById(application.idOfOffre).subscribe(
            (offerDetails) => {
              application.offerDetails = offerDetails;
            },
            (error) => {
              console.error('Error fetching offer details:', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching user applications:', error);
      }
    );
  }
  updateUser(): void {
    this.userService.updateUserById(this.userInfo.id, this.updatedUser).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        // Update the local user info after a successful update
        this.userInfo = response;
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  getBackgroundColor(etat: string): string {
    switch (etat) {
      case 'unseen':
        return 'gray';
      case 'seen':
        return 'orange';
      case 'approved':
        return 'green';
      case 'refused':
        return 'red';
      default:
        return 'transparent';
    }
  }
}
