import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

interface ApplicationResponse {
  offer: any; // Adjust the type based on your actual data structure for the offer
  applicants: any[]; // Adjust the type based on your actual data structure for the applicants
}
@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private baseUrl = 'http://localhost:3000/api/applications';
  private uploadurl = 'http://localhost:3000/api/upload';

  constructor(private http: HttpClient, private userService: UserService) {}

  getAllApplications(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getApplicationById(applicationId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${applicationId}`);
  }

  createApplication(applicationData: any): Observable<any> {
    return this.userService.getUserInfo().pipe(
      switchMap((userInfo) => {
        applicationData.idUser = userInfo.id;
        return this.http.post<any>(this.baseUrl, applicationData);
      })
    );
  }

  updateApplication(id: string, application: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, application);
  }

  deleteApplication(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}/${id}`);
  }
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.uploadurl}`, formData);
  }
  getApplicationsByUserId(userId: string): Observable<any[]> {
    const url = `${this.baseUrl}/user/${userId}`;
    return this.http.get<any[]>(url);
  }

  getApplicationsByOfferId(offerId: string): Observable<ApplicationResponse> {
    const url = `${this.baseUrl}/offer/${offerId}`;
    return this.http.get<ApplicationResponse>(url);
  }
  getOfferApplications(offerId: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/applications/${offerId}`);
  }

  getUserIdsFromApprovedApplications(): Observable<string[]> {
    const approvedApplicationsUrl = `${this.baseUrl}/approved/userIds`;

    return this.http.get<string[]>(approvedApplicationsUrl);
  }
}
