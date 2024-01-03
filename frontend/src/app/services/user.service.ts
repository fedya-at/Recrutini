import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getAllCandidats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/role/candidate`);
  }
  getAllHRs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/role/hr`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
  deleteUserById(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }
}
