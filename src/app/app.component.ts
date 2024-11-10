import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/component/menu/menu.component';
import { StudentService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers:[StudentService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-learning';
}
