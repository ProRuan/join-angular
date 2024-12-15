import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-join-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './join-header.component.html',
  styleUrl: './join-header.component.scss',
})

/**
 * Represents a join header component.
 */
export class JoinHeaderComponent {
  router: Router = inject(Router);

  src: string = '../../../../assets/img/header/help.png';

  /**
   * Logs the user out.
   */
  onLogOut() {
    this.router.navigateByUrl('login');
  }
}
