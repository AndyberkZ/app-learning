import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userProfile: { role: string } | null = null;

  constructor() {
    // Inicialmente, el usuario no está autenticado
    this.userProfile = null;
  }

  // Simula un método para iniciar sesión y guardar el perfil del usuario
  login(role: string) {
    this.userProfile = { role: this.getItem('user') || '' };
  }

  // Simula un método para cerrar sesión
  logout() {
    this.userProfile = null;
  }

  getUserProfile() {
    return this.userProfile;
  }

  hasRole(role: string): boolean {
    // console.log('roleeeee',role);
    // console.log('this.userProfile',this.userProfile);
    // console.log('this.userProfile roleee',this.userProfile);
    if (typeof localStorage !== 'undefined') {
      // Puedes usar localStorage aquí
      this.login('user');
    }
    return this.userProfile ? this.userProfile.role === role : false;
  }

  getItem(key: string): any {
    if (typeof localStorage !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? item : null;
    } else {
      console.warn('localStorage no está disponible.');
      return null;
    }
  }
}
