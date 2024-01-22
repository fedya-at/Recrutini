import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

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
  updateUserById(id: string, User: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, User);
  }
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          this.handleAuthentication(response);
        }
      }),
      catchError(this.handleError<any>('Login'))
    );
  }
  logout(): void {
    localStorage.removeItem('token');
  }
  private setHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    console.log('Token:', token); // Log the token for debugging
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    console.log('Token before request:', token);

    const headers = this.setHeaders();

    return this.http
      .get<any>(`${this.apiUrl}/auth/isAuthenticated`, { headers })
      .pipe(
        map((response) => response.isAuthenticated || false),
        catchError(() => of(false))
      );
  }

  private handleAuthentication(response: any): void {
    const token = response.token;
    localStorage.setItem('token', token);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getUserInfo(): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get<any>(`${this.apiUrl}/auth/userInfo`, { headers });
  }
}
