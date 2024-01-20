import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilteredUsersComponent } from './filtered-users/filtered-users.component';
import { BookingComponent } from './booking/booking.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { JobStatusComponent } from './job-status/job-status.component';
import { PostOffreComponent } from './post-offre/post-offre.component';
import { OffreDetailsComponent } from './offre-details/offre-details.component';
import { OffersComponent } from './offers/offers.component';
import { GereOffresComponent } from './Gere-offres/Gere-offres.component';
import { GereUsersComponent } from './gere-users/gere-users.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
const routes: Routes = [
  { path: 'interview', component: FilteredUsersComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'book/:id', component: BookingComponent },
  { path: 'status', component: JobStatusComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'create-offer', component: PostOffreComponent },
  { path: 'offer/:id', component: OffreDetailsComponent },
  { path: 'gere-offers', component: GereOffresComponent },
  { path: 'users', component: GereUsersComponent },
  { path: 'login', component: AuthentificationComponent },
  { path: 'welcome', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
