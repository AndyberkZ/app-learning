import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule si usas directivas como *ngIf o *ngFor
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-progress',
  templateUrl: './admin-progress.component.html',
  styleUrls: ['./admin-progress.component.scss'],
  standalone: true, // Este componente es autónomo
  imports: [CommonModule, ReactiveFormsModule] // Importa los módulos necesarios directamente
})
export class AdminProgressComponent {

}
