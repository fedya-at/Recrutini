import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IndividualConfig } from 'ngx-toastr';
import { CommunService, toastPayload } from '../services/commun.service';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-filtered-users',
  templateUrl: './filtered-users.component.html',
  styleUrls: ['./filtered-users.component.css'],
})
export class FilteredUsersComponent implements OnInit {
  users: any[] = [];
  toast!: toastPayload;
  selectedUserId: string | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private cs: CommunService,
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedUserId = params['id'];
      this.loadCandidats();
    });
  }
  loadCandidats(): void {
    this.applicationService.getUserIdsFromApprovedApplications().subscribe(
      (userIds) => {
        // Iterate through user IDs
        userIds.forEach((userId, index) => {
          // Use getUserById for each user ID
          this.userService.getUserById(userId).subscribe(
            (user) => {
              // Add the fetched user to the users array
              this.users.push({ ...user, index: index + 1 });
            },
            (error) => {
              this.showToast('error', `Error fetching user with ID ${userId}:`);
            }
          );
        });
      },
      (error) => {
        this.showToast('error', 'Error fetching approved applications:');
      }
    );
  }

  bookAppointment(user: any): void {
    this.router.navigate(['/book', user._id], { state: { user } });
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

