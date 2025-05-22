import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { StudentService } from "../../../../../shared/services/user.service";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NotificationService } from "../../../../../shared/services/notification.service";

@Component({ selector: 'app-forgot-password',
   templateUrl: './forgot-password.component.html',
  standalone: true,
  styleUrls: ['./forgot-password.component.scss'],
    imports: [CommonModule, ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatButtonModule],
  })
export class ForgotPasswordComponent {
  form = this.fb.group({ email: ['', [Validators.required, Validators.email]] });

  constructor(private fb: FormBuilder, private auth: StudentService,
    private notificationService: NotificationService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.auth.forgotPassword(this.form.value.email).subscribe({
        next: () => {
        this.notificationService.showSuccess('Hemos enviado un enlace de recuperación a tu correo. Por favor revísalo.');
      },
        error: err => {
        this.notificationService.showError(err.error?.error || 'Ocurrió un error al enviar el enlace de recuperación');
      }
      });
    }
  }


}
