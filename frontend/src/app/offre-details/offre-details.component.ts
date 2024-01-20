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
  //Offre properties

  offerId: any;
  title: string = '';
  company: string = '';
  companyDescription: string = '';
  location: string = '';
  salary: number = 0;
  skills: string[] = [];
  description: string = '';
  dateFin: Date = new Date();

  //application properties

  CV: string = '';

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
        this.companyDescription = offer.companyDescription;
        this.location = offer.location;
        this.salary = offer.salary;
        this.skills = offer.skills;
        this.description = offer.description;
        this.dateFin = offer.dateFin;
      },
      (error) => {
        this.showToast('error', 'Faild To Load offers ');
      }
    );
  }

  uploadFileHandler(event: any): void {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('cv', file);

    this.as.uploadFile(formData).subscribe(
      (data: { filePath: string }) => {
        this.CV = data.filePath;
        this.showToast('success', 'CV uploaded successfully!');
      },
      (error) => {
        console.error('Error uploading CV:', error);
        this.showToast('error', 'Failed to upload CV');
      }
    );
  }

  private createApplicationData(form: NgForm): any {
    return {
      firstName: form.value.firstName, // Update to match your form field names
      lastName: form.value.lastName, // Update to match your form field names
      email: form.value.email,
      phone: form.value.phone,
      CV: this.CV,
      CoverLettre: form.value.CoverLettre, // Update to match your form field names
      idOfOffre: form.value.idOfOffre,
      etat: 'unseen',
    };
  }

  private apply(applicationData: any): void {
    this.as.createApplication(applicationData).subscribe(
      (data) => {
        this.showToast('success', 'Application sent successfully!');
      },
      (error) => {
        this.showToast('error', 'Failed to send application');
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const applicationData = this.createApplicationData(form);
      this.apply(applicationData);
    } else {
      this.showToast('error', 'Failed to send application');
    }
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
