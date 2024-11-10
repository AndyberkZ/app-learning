import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/views/pages/login/login.component';
import { authGuard } from './shared/guard/auth.guard';
import { HomeComponent } from './presentation/views/pages/home/home.component';
import { StudentListComponent } from './presentation/views/pages/usuario/list-user/user-list.component';
import { StudentFormComponent } from './presentation/views/pages/usuario/form-user/user-form.component';

export const routes: Routes = [
  // {
  //   path: 'login',
  //   loadComponent: () => import('./presentation/views/pages/login/login.component').then(m => m.LoginComponent) // Carga perezosa del componente de login
  // },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./presentation/views/pages/profile/register-profile/register-profile.component').then(m => m.RegisterProfileComponent) // Carga perezosa del componente de registro
  // },
  // {
  //   path: 'edit-profile',
  //   loadComponent: () => import('./presentation/views/pages/profile/edit-profile/edit-profile.component').then(m => m.EditProfileComponent) // Carga perezosa del componente de edición de perfil
  // },
  // {
  //   path: 'admin-progress',
  //   loadComponent: () => import('./presentation/views/pages/progress/admin-progress/admin-progress.component').then(m => m.AdminProgressComponent) // Carga perezosa del componente de registro
  // },
  // {
  //   path: 'user-progress',
  //   loadComponent: () => import('./presentation/views/pages/progress/user-progress/user-progress.component').then(m => m.UserProgressComponent) // Carga perezosa del componente de edición de perfil
  // },

  // // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireccionamiento a login
  // // { path: '**', redirectTo: '/login', pathMatch: 'full' }
  {
    path: 'home',
    loadComponent: () => import('./presentation/views/pages/home/home.component').then(m => m.HomeComponent), // Carga perezosa del componente home
    //canActivate: [authGuard] // Usar la nueva función de guard
  },

  // {
  //   path: 'recommendation',
  //   loadComponent: () => import('./presentation/views/pages/recommendation/recommendation-list/recommendation-list.component').then(m => m.StudentPerformanceComponent), // Carga perezosa del componente home
  //   //canActivate: [authGuard] // Usar la nueva función de guard
  // },

  {
    path: 'recommendation',
    loadComponent: () => import('./presentation/views/pages/home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: 'list',
        loadComponent: () => import('./presentation/views/pages/recommendation/recommendation-list/recommendation-list.component').then(m => m.StudentPerformanceComponent), // Carga perezosa del componente home
      },
    ]
  },
  // { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireccionar a home después de iniciar sesión
  // { path: '**', redirectTo: '/home', pathMatch: 'full' }

  //{ path: '', redirectTo: '/students/list', pathMatch: 'full' },

  // Sección de Estudiantes
  // {
  //   path: 'students',
  //   component: HomeComponent,
  //   children: [
  //     { path: 'list', loadComponent: () => import('./presentation/views/pages/usuario/list-user/user-list.component').then(m => m.StudentListComponent)  },
  //     { path: 'new', loadComponent: () => import('./presentation/views/pages/usuario/form-user/user-form.component').then(m => m.StudentFormComponent)  },
  //     { path: 'edit/:id', component: StudentFormComponent, canActivate: [authGuard] }
  //   ]
  // },


 // { path: '', redirectTo: '/students/list', pathMatch: 'full' },

  // Rutas de estudiantes
  {
    path: 'students',
    loadComponent: () => import('./presentation/views/pages/home/home.component').then(m => m.HomeComponent),
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
   { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireccionar a home después de iniciar sesión
  { path: '**', redirectTo: '/home', pathMatch: 'full' }

  // // Sección de Cursos
  // {
  //   path: 'courses',
  //   component: HomeComponent,
  //   children: [
  //     { path: 'list', component: CourseListComponent },
  //     { path: 'new', component: CourseFormComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'profesor'] } },
  //     { path: 'edit/:id', component: CourseFormComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'profesor'] } }
  //   ]
  // },

  // // Sección de Profesores
  // {
  //   path: 'teachers',
  //   component: HomeComponent,
  //   children: [
  //     { path: 'list', component: TeacherListComponent },
  //     { path: 'new', component: TeacherFormComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  //     { path: 'edit/:id', component: TeacherFormComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } }
  //   ]
  // }
];
