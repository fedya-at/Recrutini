import { NgModule } from '@angular/core';
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
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { HRdashboardComponent } from './hrdashboard/hrdashboard.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: 'interview',
    component: FilteredUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'book/:id', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'status', component: JobStatusComponent, canActivate: [AuthGuard] },
  { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
  {
    path: 'create-offer',
    component: PostOffreComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'offer/:id',
    component: OffreDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'gere-offers',
    component: GereOffresComponent,
    canActivate: [AuthGuard],
  },
  { path: 'users', component: GereUsersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthentificationComponent },
  { path: '', component: LandingPageComponent },
  {
    path: 'Dashboard',
    component: AdmindashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Applications',
    component: HRdashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path:"application/:id",
    component:ApplicationDetailsComponent,
    canActivate: [AuthGuard],
  },

{path:'notifications',component:NotificationsComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
