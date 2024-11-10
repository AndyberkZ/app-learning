import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private router: Router) {}

  // login(email: string, password: string): Observable<{ token: string }> {
  //   return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  // }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string, role: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        console.log('response',response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role); // Guarda el rol del usuario
      })
    );
  }

  getRole(): string {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
