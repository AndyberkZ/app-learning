import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule si usas directivas como *ngIf o *ngFor
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { LoginService } from '../../../../shared/services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true, // Este componente es autónomo
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ] // Importa los módulos necesarios directamente
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.loginService.login({email, password}).subscribe({
      next: (response) => {
        if(email.includes('admin')){
          localStorage.setItem('user','admin');
        }else{
          localStorage.setItem('user','user');
        }
        localStorage.setItem('token', response.token); // Guarda el token en el almacenamiento local
        this.router.navigate(['/students/list']); // Redirige después del login exitoso
      },
      error: (error) => {
        this.errorMessage = 'Credenciales incorrectas';
      }
    });
  }


  // onLogin(): void {
  //   if (this.loginForm.valid) {
  //     const { email, password } = this.loginForm.value;
  //     console.log('Iniciar sesión con', email, password);
  //     if(email.includes('admin')){
  //       localStorage.setItem('user','admin');
  //     }else{
  //       localStorage.setItem('user','user');
  //     }

  //     this.authService.login('user'); // Simula iniciar sesión con el rol 'user'

  //     // Redirigir a la página Home
  //     this.router.navigate(['/home']);
  //   } else {
  //     console.log('Formulario inválido');
  //   }
  // }
}
