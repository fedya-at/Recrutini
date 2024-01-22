// navbar.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navbarVisible: boolean = true;
  @ViewChild('nav-items') navItemsRef!: ElementRef;
  isLoggedIn = false;
  user: any;
  userRole?: string;

  constructor(private us: UserService) {}

  toggleNavbar() {
    this.navbarVisible = !this.navbarVisible;
    const navItems = this.navItemsRef.nativeElement as HTMLElement;
    if (navItems) {
      navItems.classList.toggle('show');
    }
  }
  ngOnInit(): void {
    this.us.isAuthenticated().subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
      if (isAuthenticated) {
        // If the user is authenticated, fetch the user information
        this.us.getUserInfo().subscribe((user) => {
          this.user = user;
          this.userRole = user.role;
          console.log(this.userRole);
        });
      }
    });
  }

  logout(): void {
    this.us.logout();
    window.location.reload();
  }
}
