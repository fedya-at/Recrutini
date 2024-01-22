import { Component , ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  @ViewChild('headerSection') headerSection!: ElementRef;
  @ViewChild('collaboratorsSection') collaboratorsSection!: ElementRef;
  @ViewChild('servicesSection') servicesSection!: ElementRef;
  // Add more @ViewChild for other sections

  // Function to check if an element is in the viewport
  isElementInViewport(el: ElementRef): boolean {
    const rect = el.nativeElement.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to handle animations when an element is in view
  handleAnimation(el: ElementRef): void {
    if (this.isElementInViewport(el)) {
      el.nativeElement.classList.add('animate__animated', 'animate__fadeIn');
    }
  }

  // Listen for scroll events and trigger animations
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.handleAnimation(this.headerSection);
    this.handleAnimation(this.collaboratorsSection);
    this.handleAnimation(this.servicesSection);
    // Add more calls to handleAnimation for other sections
  }
}
