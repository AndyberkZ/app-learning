import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule si usas directivas como *ngIf o *ngFor
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true, // Este componente es autónomo
  imports: [CommonModule, ReactiveFormsModule] // Importa los módulos necesarios directamente
})
export class MenuComponent {

  constructor(private authService: AuthService, private loginService: LoginService) {}

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
    return this.authService.hasRole('admin');
  }

  isUser(): boolean {
    return this.authService.hasRole('user');
  }
  logout(){
    this.loginService.logout();
  }
}
