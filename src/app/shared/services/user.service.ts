import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la interfaz del modelo de datos
export interface Student {
  _id?: string;
  name: string;
  email: string;
  role: 'estudiante' | 'profesor' | 'admin';
  age?: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/users'; // URL del backend

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método GET: Obtener todos los estudiantes
  getStudents(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}`, { headers });
  }

  // Método POST: Crear un nuevo estudiante
  createStudent(student: Student): Observable<Student> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Student>(this.apiUrl, student, { headers });
  }

  // Método PUT: Actualizar un estudiante
  updateStudent(id: string, student: Student): Observable<Student> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student, { headers });
  }

  // Método DELETE: Eliminar un estudiante
  deleteStudent(id: string): Observable<void> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getAveragePerformance(studentId: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${studentId}/average-performance`, { headers });
  }

  getCourses() {
    return [
      'Matemáticas', 'Ciencia', 'Historia', 'Geografía', 'Lenguaje', 'Arte', 'Deportes'
    ];
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password/${token}`, { newPassword });
  }
}
