import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userInfo: any; // Define the userInfo property

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Fetch user information when the component initializes
    this.userService.getUserInfo().subscribe(
      (response) => {
        this.userInfo = response;
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }
}

