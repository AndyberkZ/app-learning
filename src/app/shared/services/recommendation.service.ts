import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRecommendations(studentId: string): Observable<any> {
    const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/recommendations/${studentId}`, { headers });
  }

  getActivities(): Observable<any[]> {
    const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/activity`, { headers });
  }

  sendFeedback(feedback: { student: string; activity: string; rating: number; comment?: string }): Observable<any> {
    const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/feedback`, feedback, { headers });
  }

  getFeedbackAnalysis(): Observable<any> {
    const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/feedback`, { headers });
  }
}
