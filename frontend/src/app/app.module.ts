// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilteredUsersComponent } from './filtered-users/filtered-users.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { BookingComponent } from './booking/booking.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatDialogModule } from '@angular/material/dialog';
import { JobStatusComponent } from './job-status/job-status.component';
import { PostOffreComponent } from './post-offre/post-offre.component';
import { OffersComponent } from './offers/offers.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { OffreDetailsComponent } from './offre-details/offre-details.component';
import { ListOffresComponent } from './list-offres/list-offres.component';

@NgModule({
  declarations: [
    AppComponent,
    FilteredUsersComponent,
    AppointmentsComponent,
    BookingComponent,
    JobStatusComponent,
    PostOffreComponent,
    OffersComponent,
    NavbarComponent,
    FooterComponent,
    OffreDetailsComponent,
    ListOffresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}