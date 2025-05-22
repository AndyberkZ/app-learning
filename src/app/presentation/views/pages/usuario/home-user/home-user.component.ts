import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-user',
  imports: [RouterOutlet],
  standalone:true,
  template: `
    <router-outlet></router-outlet>
  `,
})
export class HomeUserComponent {}
