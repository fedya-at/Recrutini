import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IndividualConfig } from 'ngx-toastr';
import { CommunService, toastPayload } from '../services/commun.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedUserId = params['id'];
      this.loadCandidats();
    });
  }

  loadCandidats(): void {
    this.userService.getAllCandidats().subscribe(
      (data) => {
        this.users = data.map((user, index) => ({ ...user, index: index + 1 }));
      },
      (error) => {
        this.showToast('error', 'Error fetching candidats:');
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

