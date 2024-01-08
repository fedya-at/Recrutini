import { Component, OnInit } from '@angular/core';
import { OffreService } from '../services/offre.service';
import { IndividualConfig } from 'ngx-toastr';
import { CommunService, toastPayload } from '../services/commun.service';

@Component({
  selector: 'app-Gere-offres',
  templateUrl: './Gere-offres.component.html',
  styleUrls: ['./Gere-offres.component.css'],
})
export class GereOffresComponent implements OnInit {
  offers: any[] = [];
  editedOffer: any = {};
  toast!: toastPayload;

  constructor(private os: OffreService, private cs: CommunService) {}

  ngOnInit(): void {
    this.loadsOffers();
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

  loadsOffers(): void {
    this.os.getAllOffers().subscribe(
      (data) => {
        this.offers = data;
      },
      (error) => {
        this.showToast('error', error.message);
      }
    );
  }

  editOffer(offer: any): void {
    this.editedOffer = { ...offer };
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this offer?')) {
      this.os.deleteOffre(id).subscribe(
        () => {
          this.loadsOffers();
          this.showToast('success', 'Offre deleted successfully');
        },
        (error) => {
          this.showToast('error', error.message);
        }
      );
    }
  }
  onEditSubmit(): void {
    if (this.editedOffer._id) {
      this.os.updateOffer(this.editedOffer._id, this.editedOffer).subscribe(
        (data) => {
          this.loadsOffers();
          this.showToast('success', 'Offer updated successfully');
        },
        (error) => {
          this.showToast('error', error.message);
        }
      );
    } else {
      this.showToast('error', 'Invalid offer data');
    }
  }
}
