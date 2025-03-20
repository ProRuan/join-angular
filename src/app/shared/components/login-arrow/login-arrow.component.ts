import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JoinService } from '../../services/join.service';

@Component({
  selector: 'app-login-arrow',
  standalone: true,
  imports: [],
  templateUrl: './login-arrow.component.html',
  styleUrl: './login-arrow.component.scss',
})

/**
 * Class representing a login arrow component.
 */
export class LoginArrowComponent {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);

  /**
   * Redirects to the login on click.
   */
  onBack() {
    this.router.navigateByUrl('login');
  }
}
