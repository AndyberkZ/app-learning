import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.component.html',
  styleUrl: './register-profile.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterProfileComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } = this.registerForm.value;
      if (password !== confirmPassword) {
        console.log('Las contraseñas no coinciden');
        return;
      }
      console.log('Registro exitoso:', name, email);
    } else {
      console.log('Formulario inválido');
    }
  }
}
