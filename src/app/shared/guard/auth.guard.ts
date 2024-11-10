import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Función de guard de autenticación
export function authGuard(): boolean {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getUserProfile()) {
    // Si el usuario está autenticado, permitir el acceso
    return true;
  } else {
    // Si no está autenticado, redirigir al login
    router.navigate(['/login']);
    return false;
  }

}

// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const authService = inject(AuthService);

//   const userRole = authService.getUserRole(); // Obtén el rol del usuario actual
//   const allowedRoles = route.data?.['roles'] as Array<string>;

//   // Verifica si el rol del usuario está permitido en la ruta
//   if (allowedRoles.includes(userRole)) {
//     return true;
//   } else {
//     router.navigate(['/unauthorized']); // Redirige si no tiene acceso
//     return false;
//   }
// };
