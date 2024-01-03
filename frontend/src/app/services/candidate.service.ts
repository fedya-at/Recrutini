import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private baseUrl = 'http://localhost:3000/api/candidate'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  getAppliedJobs(): Observable<any[]> {
    const url = `${this.baseUrl}/applied-jobs`;
    return this.http.get<any[]>(url);
  }
}
