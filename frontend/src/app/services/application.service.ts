import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private baseUrl = 'http://localhost:3000/api/applications';

  constructor(private http: HttpClient) {}

  getAllApplications(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getApplicationById(applicationId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${applicationId}`);
  }

  createAppointment(applicationData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, applicationData);
  }

  updateApplication(id: string, application: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.baseUrl}/${id}`, application);
  }

  deleteApplication(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}/${id}`);
  }
}