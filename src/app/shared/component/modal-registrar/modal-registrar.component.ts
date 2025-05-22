// success-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports:[MatDialogModule, MatIconModule],
  template: `
    <div class="success-dialog-container">
  <div class="dialog-content">
    <div class="icon-container">
      <div class="animated-checkmark">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
    </div>

    <h1 class="dialog-title">¡Registro Exitoso!</h1>

    <p class="dialog-message">El estudiante ha sido {{data.isEdit ? 'actualizado' : 'registrado'}} correctamente en el sistema.</p>

    <div class="dialog-actions">
      <button mat-raised-button
              color="primary"
              class="confirm-button"
              mat-dialog-close
              cdkFocusInitial>
        <mat-icon>done_all</mat-icon>
        ACEPTAR
      </button>
    </div>
  </div>
</div>
  `,
  styles: [`
   .success-dialog-container {
  padding: 0;
  overflow: hidden;
  border-radius: 16px !important;

  .dialog-content {
    padding: 40px;
    text-align: center;
    background: white;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      background: linear-gradient(90deg, #4CAF50, #8BC34A);
    }
  }

  .icon-container {
    margin: 0 auto 24px;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .animated-checkmark {
    width: 80px;
    height: 80px;

    .checkmark {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: block;
      stroke-width: 4;
      stroke: #fff;
      stroke-miterlimit: 10;
      margin: 10% auto;
      box-shadow: 0 0 0 rgba(76, 175, 80, 0.4);
      animation: checkmark-fill 0.4s ease-in-out 0.4s forwards,
                 checkmark-scale 0.3s ease-in-out 0.9s both;
    }

    .checkmark-circle {
      stroke-dasharray: 166;
      stroke-dashoffset: 166;
      stroke-width: 4;
      stroke-miterlimit: 10;
      stroke: #4CAF50;
      fill: none;
      animation: checkmark-stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
    }

    .checkmark-check {
      transform-origin: 50% 50%;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      animation: checkmark-stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
    }
  }

  .dialog-title {
    color: #2E7D32;
    font-size: 28px;
    font-weight: 600;
    margin: 0 0 16px;
    letter-spacing: 0.5px;
  }

  .dialog-message {
    color: #424242;
    font-size: 16px;
    line-height: 1.5;
    margin: 0 auto 32px;
    max-width: 320px;
  }

  .dialog-actions {
    display: flex;
    justify-content: center;

    .confirm-button {
      padding: 8px 32px;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 0.5px;
      border-radius: 50px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.1);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 12px rgba(0,0,0,0.15);
      }

      &:active {
        transform: translateY(0);
      }

      .mat-icon {
        margin-right: 8px;
      }
    }
  }
}

/* Animaciones */
@keyframes checkmark-stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes checkmark-scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes checkmark-fill {
  100% {
    box-shadow: inset 0 0 0 100px #4CAF50;
  }
}
  `]
})
export class SuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {isEdit: boolean}
  ) {}
}
