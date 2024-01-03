import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/api/appointments';

  constructor(private http: HttpClient) {}

  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAppointmentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, appointment);
  }

  updateAppointment(id: string, appointment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, appointment);
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getAppointmentsByDate(date: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/appointmentsByDate?date=${date}`
    );
  }
}
