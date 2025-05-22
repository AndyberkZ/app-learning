// confirmation-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirmation-dialog',
  standalone:true,
  imports:[MatIconModule, MatDialogModule ],
  template: `
    <div class="delete-dialog-container">
  <!-- Cabecera mejorada -->
  <div class="dialog-header">
    <div class="header-icon-container">
      <mat-icon class="header-icon">warning</mat-icon>
    </div>
    <h2 class="dialog-title">Confirmar Eliminación</h2>
  </div>

   <mat-dialog-content class="dialog-content">
    <div class="student-info-container">
      <div class="student-avatar">
        <mat-icon>person_outline</mat-icon>
      </div>
      <div class="student-details">
        <h3>{{data.studentName}}</h3>
        <div class="detail-row">
          <mat-icon class="detail-icon">email</mat-icon>
          <span class="detail-text">{{data.studentEmail}}</span>
        </div>
        <div class="detail-row">
          <mat-icon class="detail-icon">fingerprint</mat-icon>
          <span class="detail-text">DNI: {{data.studentDni}}</span>
        </div>
      </div>
    </div>

    <div class="warning-message">
      <mat-icon class="warning-icon">error_outline</mat-icon>
      <div class="warning-text">
        <strong>¡Atención!</strong> Esta acción eliminará permanentemente todos los datos del estudiante.
      </div>
    </div>
  </mat-dialog-content>

  <!-- Acciones - Botones mejorados -->
  <mat-dialog-actions class="dialog-actions">
    <button mat-stroked-button mat-dialog-close class="cancel-button">
      <mat-icon>close</mat-icon>
      CANCELAR
    </button>
    <button mat-raised-button color="warn" [mat-dialog-close]="true" class="confirm-button">
      <mat-icon>delete_forever</mat-icon>
      CONFIRMAR ELIMINACIÓN
    </button>
  </mat-dialog-actions>
</div>
  `,
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      studentName: string,
      studentEmail: string,
      studentDni: string
    }
  ) {}
}
