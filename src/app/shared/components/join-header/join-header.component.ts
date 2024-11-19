import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-join-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './join-header.component.html',
  styleUrl: './join-header.component.scss',
})
export class JoinHeaderComponent {
  route: Router = inject(Router);

  logOut() {
    this.route.navigateByUrl('login');
  }

  // add log out dialog!!!
}
