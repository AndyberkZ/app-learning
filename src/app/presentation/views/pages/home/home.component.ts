import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule si usas directivas como *ngIf o *ngFor
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../../../shared/component/menu/menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true, // Este componente es autónomo
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, MenuComponent] // Importa los módulos necesarios directamente
})
export class HomeComponent {


  constructor(private fb: FormBuilder) {

  }


}
