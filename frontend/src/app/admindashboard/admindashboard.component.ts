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

  pageSize: number = 4;
  usersPage: number = 1;
  offersPage: number = 1;

  constructor(
    private userService: UserService,
    private offreService: OffreService
  ) {}

  ngOnInit(): void {
    // Fetch users on component initialization
    this.fetchUsers();
    this.fetchOffers();
  }

  showUsersSection(): void {
    this.showUsers = true;
    this.showOffers = false;
    this.usersPage = 1; // Reset page number when switching sections
    this.fetchUsers();
  }

  showOffersSection(): void {
    this.showUsers = false;
    this.showOffers = true;
    this.offersPage = 1; // Reset page number when switching sections
    this.fetchOffers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchOffers(): void {
    this.offreService.getAllOffers().subscribe(
      (data) => {
        this.offers = data;
      },
      (error) => {
        console.error('Error fetching offers:', error);
      }
    );
  }

  getPaginatedUsers(): any[] {
    const startIndex = (this.usersPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.users.length);
    return this.users.slice(startIndex, endIndex);
  }
  getPaginatedOffers(): any[] {
    const startIndex = (this.offersPage - 1) * this.pageSize;
    return this.offers.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChangeUsers(page: number): void {
    this.usersPage = page;
    this.fetchUsers();
  }

  onPageChangeOffers(page: number): void {
    this.offersPage = page;
    this.fetchOffers();
  }

  getUsersPaginationArray(): number[] {
    const pageCount = Math.ceil(this.users.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
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
