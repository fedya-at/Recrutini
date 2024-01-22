import { Component, OnInit } from '@angular/core';
import { OffreService } from '../services/offre.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
})
export class AdmindashboardComponent implements OnInit {
  users: any[] = [];
  offers: any[] = [];
  showUsers: boolean = true;
  showOffers: boolean = false;

  usersPage: number = 1;
  usersPageSize: number = 4;

  offersPage: number = 1;
  offersPageSize: number = 4;

  constructor(
    private userService: UserService,
    private offreService: OffreService
  ) {}

  showUsersSection(): void {
    this.showUsers = true;
    this.showOffers = false;
  }

  showOffersSection(): void {
    this.showUsers = false;
    this.showOffers = true;
  }

  ngOnInit(): void {
    // Fetch users on component initialization
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );

    // Fetch offers on component initialization
    this.offreService.getAllOffers().subscribe(
      (data) => {
        this.offers = data;
      },
      (error) => {
        console.error('Error fetching offers:', error);
      }
    );
  }

  // Edit user method
  editUser(userId: string): void {}

  // Delete user method
  deleteUser(userId: string): void {}

  // Edit offer method
  editOffer(offerId: string): void {}

  // Delete offer method
  deleteOffer(offerId: string): void {}
}
