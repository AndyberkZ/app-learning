import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from "../../../../../shared/services/user.service";
import { MatIconModule } from "@angular/material/icon";
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({ selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  standalone: true,
  styleUrls: ['./reset-password.component.scss'],
    imports: [CommonModule, ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatFormFieldModule,
      MatInputModule,
      MatProgressBarModule,
      MatIconModule,
      MatButtonModule],
})
export class ResetPasswordComponent implements OnInit {
  form = this.fb.group({ newPassword: ['', Validators.required] });
  token = '';
  mensaje = '';
  hidePassword = true;
passwordStrength = 0;

  constructor(private router: Router,private fb: FormBuilder, private route: ActivatedRoute, private auth: StudentService) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token')!;
  }

  getPasswordErrorMessage(): string {
  const errors = this.form.get('newPassword')?.errors;
  if (errors?.['required']) {
    return 'La contraseña es obligatoria';
  }
  if (errors?.['minlength']) {
    return 'Mínimo 8 caracteres requeridos';
  }
  // Agrega más validaciones según necesites
  return 'Contraseña inválida';
}

getStrengthText(): string {
  console.log('this.passwordStrength',this.passwordStrength);
  if (this.passwordStrength < 40) return 'Débil';
  if (this.passwordStrength < 70) return 'Regular';
  return 'Fuerte';
}

// Método para calcular fortaleza (llamar en el input change)
checkPasswordStrength() {
  const password = this.form.get('newPassword')?.value;
  // Implementa tu lógica para calcular fortaleza
  // Ejemplo básico:
  let strength = 0;
  if (password.length >= 8) strength += 30;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 20;
  if (/[^A-Za-z0-9]/.test(password)) strength += 30;
  console.log('strengthstrength',strength);
  this.passwordStrength = Math.min(strength, 100);
}

  onSubmit() {
    if (this.form.valid) {
      this.auth.resetPassword(this.token, this.form.value.newPassword).subscribe({
        next: () => {
          this.mensaje = 'Contraseña actualizada correctamente. Redirigiendo al login...';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          console.error(err);
          this.mensaje = 'Error al actualizar la contraseña. Intenta nuevamente.';
        }
      });
    }
  }
}
