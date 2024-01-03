// navbar.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navbarVisible: boolean = true;
  @ViewChild('nav-items') navItemsRef!: ElementRef;

  toggleNavbar() {
    this.navbarVisible = !this.navbarVisible;
    const navItems = this.navItemsRef.nativeElement as HTMLElement;
    if (navItems) {
      navItems.classList.toggle('show');
    }
  }
}
