import { Component, OnInit } from '@angular/core';
import { OffreService } from '../services/offre.service';
import { IndividualConfig } from 'ngx-toastr';
import { CommunService, toastPayload } from '../services/commun.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  jobOffers: any[] = [];
  toast!: toastPayload;
  location: string = '';
  skills: string = '';

  constructor(public os: OffreService, private cs: CommunService,private router:Router) {}
  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.os.getAllOffers().subscribe(
      (offers) => {
        this.jobOffers = offers;
      },
      (error) => {
        this.showToast('error', error.message);
      }
    );
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

  searchJobs() {
    this.location = this.location.toLowerCase();
    this.skills = this.skills.toLowerCase();

    this.os.searchByCriteria(this.location, this.skills).subscribe(
      (data: any) => {
        this.os.updateJobResults(data);
        if (data && data.length > 0) {
          // Redirect to the desired route upon successful search
          this.router.navigate(['offers']);
        }
      },
      (error) => {
        console.error('Error:', error);
        // Handle error as needed
      }
    );
  }
}
