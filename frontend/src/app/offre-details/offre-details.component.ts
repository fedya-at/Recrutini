import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffreService } from '../services/offre.service';
import { ApplicationService } from '../services/application.service';
import { NgForm } from '@angular/forms';
import { IndividualConfig } from 'ngx-toastr';
import { CommunService, toastPayload } from '../services/commun.service';

@Component({
  selector: 'app-offre-details',
  templateUrl: './offre-details.component.html',
  styleUrls: ['./offre-details.component.css'],
})
export class OffreDetailsComponent implements OnInit {
  offerId: string = '';
  title: string = '';
  company: string = '';
  roleDescription: string = '';
  location: string = '';
  salary: number = 0;
  skills: string[] = [];
  description: string = '';
  whatWeOffer: string = '';
  dateFin: Date = new Date();

  coverLetter: string = '';
  myForm!: NgForm;

  toast!: toastPayload;

  constructor(
    private route: ActivatedRoute,
    private offreService: OffreService,
    private as: ApplicationService,
    private cs: CommunService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const offerId = params['id'];
      this.loadOfferDetails(offerId);
    });
  }

  loadOfferDetails(offerId: string): void {
    this.offreService.getOfferById(offerId).subscribe(
      (offer) => {
        this.offerId = offer._id;
        this.title = offer.title;
        this.company = offer.company;
        this.roleDescription = offer.roleDescription;
        this.location = offer.location;
        this.salary = offer.salary;
        this.skills = offer.skills;
        this.description = offer.description;
        this.whatWeOffer = offer.whatWeOffre;
        this.dateFin = offer.dateFin;
      },
      (error) => {
        console.error('Error loading offer details:', error);
      }
    );
  }
  onSubmit(form: NgForm) {
    const applicationData = {
      idOfOffre: this.offerId,
      firstName: form.value.firstname,
      lastName: form.value.lastname,
      email: form.value.email,
      CV: form.value.cv,
      CoverLettre: form.value.coverLetter,
    };

    if (!applicationData.idOfOffre) {
      this.showToast('error', `Invalid offerId: ${this.offerId}`);
      return;
    }

    this.as.createAppointment(applicationData).subscribe(
      (response) => {
        this.showToast('success', 'Application submitted successfully!');
        form.resetForm();
      },
      (error) => {
        this.showToast(
          'error',
          'Failed to submit application. Please try again.'
        );
        console.error(error);
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
