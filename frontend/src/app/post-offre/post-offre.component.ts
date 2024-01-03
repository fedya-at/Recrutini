import { Component, OnInit } from '@angular/core';
import { OffreService } from '../services/offre.service';
import { IndividualConfig } from 'ngx-toastr';
import { CommunService, toastPayload } from '../services/commun.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-offre',
  templateUrl: './post-offre.component.html',
  styleUrls: ['./post-offre.component.css'],
})
export class PostOffreComponent {
  toast!: toastPayload;
  offre: any = {};
  constructor(
    private cs: CommunService,
    private offreService: OffreService,
    private router: Router
  ) {}

  onSubmit() {
    this.offreService.createOffer(this.offre).subscribe(
      (data) => {
        this.showToast('success', 'Offre created successfully');
        this.router.navigate(['/list-offres']);
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
