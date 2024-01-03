import { Component, OnInit } from '@angular/core';
import { OffreService } from '../services/offre.service';
import { IndividualConfig } from 'ngx-toastr';
import { CommunService, toastPayload } from '../services/commun.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  jobOffers: any[] = [];
  toast!: toastPayload;
  constructor(public os: OffreService, private cs: CommunService) {}
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
}
