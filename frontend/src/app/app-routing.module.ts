import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilteredUsersComponent } from './filtered-users/filtered-users.component';
import { BookingComponent } from './booking/booking.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { JobStatusComponent } from './job-status/job-status.component';
import { PostOffreComponent } from './post-offre/post-offre.component';
import { OffreDetailsComponent } from './offre-details/offre-details.component';
import { OffersComponent } from './offers/offers.component';
import { ListOffresComponent } from './list-offres/list-offres.component';

const routes: Routes = [
  { path: 'interview', component: FilteredUsersComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'book/:id', component: BookingComponent },
  { path: 'status', component: JobStatusComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'create-offer', component: PostOffreComponent },
  { path: 'offer/:id', component: OffreDetailsComponent },
  { path: 'offersList', component: ListOffresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
