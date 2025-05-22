import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/views/pages/login/login.component';
import { authGuard } from './shared/guard/auth.guard';
import { HomeComponent } from './presentation/views/pages/home/home.component';
import { StudentListComponent } from './presentation/views/pages/usuario/list-user/user-list.component';
import { StudentFormComponent } from './presentation/views/pages/usuario/form-user/user-form.component';

export const routes: Routes = [
  // // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireccionamiento a login
  // // {h: '**', redirectTo: '/login', pathMatch: 'full' }
  {
    path: 'home',
    loadComponent: () => import('./presentation/views/pages/home/home.component').then(m => m.HomeComponent), // Carga perezosa del componente home
    //canActivate: [authGuard] // Usar la nueva función de guard
  },

  {
    path: 'feedback',
    loadComponent: () => import('./presentation/views/pages/feedback/home-feedback/home-feedback.component').then(m => m.HomeFeedbackComponent),
    children: [
      {
        path: 'list',
        loadComponent: () => import('./presentation/views/pages/feedback/list-feedback/list-feedback.component').then(m => m.FeedbackListComponent), // Carga perezosa del componente home
      },
    ]
  },

  {
    path: 'recommendation',
    loadComponent: () => import('./presentation/views/pages/recommendation/recommendation-home/recommendation-home.component').then(m => m.HomeRecommendationComponent),
    children: [
      {
        path: 'list',
        loadComponent: () => import('./presentation/views/pages/recommendation/recommendation-list/recommendation-list.component').then(m => m.StudentPerformanceComponent), // Carga perezosa del componente home
      },
      {
        path: 'alert',
        loadComponent: () => import('./presentation/views/pages/recommendation/recommendation-alert/recommendation-alert.component').then(m => m.AlertPerformanceComponent), // Carga perezosa del componente home
      },
    ]
  },
  {
    path: 'activities',
    loadComponent: () => import('./presentation/views/pages/activities/home-activities/home-activities.component').then(m => m.HomeActivitiesComponent),
    children: [
      {
        path: 'list',
        loadComponent: () => import('./presentation/views/pages/activities/list-activities/list-activities.component').then(m => m.ActivitiesListComponent), // Carga perezosa del componente home
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./presentation/views/pages/feedback/send-feedback/send-feedback.component').then(m => m.FeedbackSendComponent),
        // canActivate: [authGuard],
        // data: { roles: ['admin'] }
      },
    ]
  },

  {
    path: 'students',
    loadComponent: () => import('./presentation/views/pages/usuario/home-user/home-user.component').then(m => m.HomeUserComponent),
    children: [
      {
        path: 'list',
        loadComponent: () => import('./presentation/views/pages/usuario/list-user/user-list.component').then(m => m.StudentListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./presentation/views/pages/usuario/form-user/user-form.component').then(m => m.StudentFormComponent),
        // canActivate: [authGuard],
        // data: { roles: ['estudiante'] }
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./presentation/views/pages/usuario/form-user/user-form.component').then(m => m.StudentFormComponent),
        // canActivate: [authGuard],
        // data: { roles: ['admin'] }
      },

      {
        path: 'performance/:id',
        loadComponent: () => import('./presentation/views/pages/recommendation/recommendation-list/recommendation-list.component').then(m => m.StudentPerformanceComponent),
        // canActivate: [authGuard],
        // data: { roles: ['admin'] }
      }
    ]
  },
   {
    path: 'login',
    loadComponent: () => import('./presentation/views/pages/login/login.component').then(m => m.LoginComponent) // Carga perezosa del componente de login
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./presentation/views/pages/password/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent ) // Carga perezosa del componente de login
  },
  {
    path: 'reset-password/:token',
    loadComponent: () => import('./presentation/views/pages/password/reset-password/reset-password.component').then(m => m.ResetPasswordComponent ) // Carga perezosa del componente de login
  },
   { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireccionar a home después de iniciar sesión
  { path: '**', redirectTo: '/home', pathMatch: 'full' }

  // Sección de Curso
];
