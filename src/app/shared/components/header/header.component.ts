import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  route: Router = inject(Router);

  logOut() {
    this.route.navigateByUrl('login');
  }

  // add log out dialog!!!
}
