import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommunService, toastPayload } from '../services/commun.service';
import { IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-gere-users',
  templateUrl: './gere-users.component.html',
  styleUrls: ['./gere-users.component.css'],
})
export class GereUsersComponent implements OnInit {
  toast!: toastPayload;
  users: any[] = [];
  editedUser: any = {};

  constructor(private us: UserService, private cs: CommunService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.us.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.showToast('error', 'Error in Fetching users');
      }
    );
  }
  editUser(user: any): void {
    this.editedUser = { ...user };
  }

  onEditSubmit(): void {
    if (this.editedUser._id) {
      this.us.updateUserById(this.editedUser._id, this.editedUser).subscribe(
        (data) => {
          this.loadUsers();
          this.showToast('success', 'User role updated successfully');
        },
        (error) => {
          this.showToast('error', 'Error updating user role');
        }
      );
    } else {
      this.showToast('error', 'Invalid user data');
    }
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this User?')) {
      this.us.deleteUserById(id).subscribe(
        () => {
          this.loadUsers();
          this.showToast('success', 'User deleted successfully');
        },
        (error) => {
          this.showToast('error', error.message);
        }
      );
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
