import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditProfileComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  onUpdateProfile(): void {
    if (this.profileForm.valid) {
      const { name, email, password } = this.profileForm.value;
      console.log('Perfil actualizado:', name, email, password ? 'Contraseña actualizada' : 'Sin cambio en contraseña');
    } else {
      console.log('Formulario inválido');
    }
  }
}
