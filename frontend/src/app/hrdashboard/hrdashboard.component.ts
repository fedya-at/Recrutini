import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
interface ApplicationResponse {
  offer: any; // Adjust the type based on your actual data structure for the offer
  applicants: any[]; // Adjust the type based on your actual data structure for the applicants
}
@Component({
  selector: 'app-hrdashboard',
  templateUrl: './hrdashboard.component.html',
  styleUrls: ['./hrdashboard.component.css'],
})
export class HRdashboardComponent implements OnInit {
  
  applications: any[] = []; // Adjust the type based on your actual data structure
  offer: any; // Adjust the type based on your actual data structure

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    const offerId = 'yourOfferId'; // Replace with the actual offer ID

    this.applicationService.getApplicationsByOfferId(offerId).subscribe(
      (data) => {
        this.applications = data.applicants;
        this.offer = data.offer;
      },
      (error) => {
        console.error('Error fetching applications:', error);
      }
    );
  }

  loadAppl
}
