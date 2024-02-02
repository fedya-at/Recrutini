import { OffreService } from './../services/offre.service';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { IndividualConfig } from 'ngx-toastr';
import { CommunService, toastPayload } from '../services/commun.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  NgxExtendedPdfViewerService,
  pdfDefaultOptions,
} from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css'],
})
export class ApplicationDetailsComponent implements OnInit {
  applicationId!: string;
  applicationDetails: any;
  toast!: toastPayload;
  offerDetails: any;

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private cs: CommunService,
    private OffreService: OffreService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    pdfDefaultOptions.doubleTapZoomFactor = '150%'; // The default value is '200%'
    pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5;
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
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.applicationId = params['id'];
      this.loadApplicationDetails();
    });
  }
  loadApplicationDetails(): void {
    this.applicationService.getApplicationById(this.applicationId).subscribe(
      (application) => {
        this.applicationDetails = application;
        this.sanitizeCVUrl(); // Call the sanitizer method

        this.loadOfferDetails(this.applicationDetails.idOfOffre);
      },
      (error) => {
        this.showToast(
          'error',
          ' Error fetching application details:' + error.message
        );
      }
    );
  }
  sanitizeCVUrl(): void {
    if (this.applicationDetails && this.applicationDetails.CV) {
      this.applicationDetails.CV =
        this.sanitizer.bypassSecurityTrustResourceUrl(
          this.applicationDetails.CV
        ) as SafeResourceUrl;
    }
  }
  loadOfferDetails(offerId: string): void {
    this.OffreService.getOfferById(offerId).subscribe(
      (offer) => {
        this.offerDetails = offer;
      },
      (error) => {
        console.error('Error fetching offer details:', error);
      }
    );
  }

  approveApplication(): void {
    this.updateApplicationState('approved');
  }

  rejectApplication(): void {
    this.updateApplicationState('refused');
  }
  private updateApplicationState(newState: string): void {
    if (this.applicationDetails && this.applicationDetails._id) {
      // Update the etat property in the local object
      this.applicationDetails.etat = newState;

      // Call the API to update the application state
      this.applicationService
        .updateApplication(this.applicationDetails._id, { etat: newState })
        .subscribe(
          (updatedApplication) => {
            // Handle success, if needed
            this.showToast('success',
              'Application state updated successfully:'+
              updatedApplication
            );
            this.router.navigate(['/Applications']);
          },
          (error) => {
            // Handle error, if needed
            this.showToast('error','Error updating application state:'+ error);
          }
        );
    }
  }
}
