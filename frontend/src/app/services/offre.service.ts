import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OffreService {
  private apiUrl = 'http://localhost:3000/api/offres';

  constructor(private http: HttpClient) {}

  getAllOffers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOfferById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createOffer(offre: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, offre);
  }

  updateOffer(id: string, Offer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, Offer);
  }

  deleteOffre(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getOfferByPostedById(id: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/postedBy/${id}`);
  }
}
