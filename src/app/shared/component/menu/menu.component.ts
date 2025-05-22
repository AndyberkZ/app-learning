import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule si usas directivas como *ngIf o *ngFor
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';
import { StudentService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true, // Este componente es autónomo
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatProgressSpinnerModule] // Importa los módulos necesarios directamente
})
export class MenuComponent {
  performanceData: any;
  isLoading = true;
  error: string | null = null;

  constructor(private authService: AuthService, private loginService: LoginService, private studentService: StudentService) {
   // this.getPerformanceData();
  }

  // Método para verificar el rol del usuario
  hasRole(role: string): boolean {
    console.log('rolerole',role);
    return this.authService.hasRole(role);
  }

  isAdminMenuOpen = false; // Estado para el submenú del administrador
  isUserMenuOpen = false;  // Estado para el submenú del usuario


  // Métodos para alternar la visibilidad de los submenús
  toggleAdminMenu() {
    this.isAdminMenuOpen = !this.isAdminMenuOpen;
    this.isUserMenuOpen = false; // Cierra el otro menú si está abierto
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    this.isAdminMenuOpen = false; // Cierra el otro menú si está abierto
  }

  // Métodos para verificar el rol del usuario
  isAdmin(): boolean {
    return this.authService.hasRole('admin') || this.authService.hasRole('profesor');
  }

  getProfile(): string {
    return this.authService.getUserProfile().role;
  }

  isUser(): boolean {
    return this.authService.hasRole('estudiante');
  }
  logout(){
    this.loginService.logout();
  }

  getProfileImage(): string {
    return 'assets/perfil.png'; // Cambia esto por una URL dinámica o archivo estático
  }

  // getPerformanceData(): void {
  //   let token = localStorage.getItem('token') || '';
  //   const payload = JSON.parse(atob(token.split('.')[1]));

  //   this.studentService.getAveragePerformance(payload.id).subscribe(
  //     (data) => {
  //       this.performanceData = data;
  //       this.isLoading = false;
  //     },
  //     (error) => {
  //       this.error = 'No se pudo cargar el rendimiento del estudiante.';
  //       console.error('Error:', error);
  //       this.isLoading = false;
  //     }
  //   );
  // }



  // getPerformanceClass(category: string): string {
  //   switch (category) {
  //     case 'Excelente':
  //       return 'excellent-performance';
  //     case 'Normal':
  //       return 'normal-performance';
  //     case 'Bajo':
  //       return 'low-performance';
  //     default:
  //       return '';
  //   }
  // }
}
