// notification.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  standalone:true,
  imports:[MatIconModule, MatDialogModule],
  template: `
    <div class="notification" [class.success]="data.type === 'success'" [class.error]="data.type === 'error'">
      <mat-icon class="notification-icon">{{ data.type === 'success' ? 'check_circle' : 'error' }}</mat-icon>
      <span class="notification-message">{{ data.message }}</span>
      <button mat-icon-button class="close-button" (click)="dismiss()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  dismiss(): void {
    this.data.snackBar.dismiss();
  }
}
