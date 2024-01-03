import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffreService } from '../services/offre.service';

@Component({
  selector: 'app-offre-details',
  templateUrl: './offre-details.component.html',
  styleUrls: ['./offre-details.component.css'],
})
export class OffreDetailsComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private offreService: OffreService
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
}
