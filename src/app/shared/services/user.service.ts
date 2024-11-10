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
    return this.http.post<Student>(this.apiUrl, student);
  }

  // Método PUT: Actualizar un estudiante
  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  // Método DELETE: Eliminar un estudiante
  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
