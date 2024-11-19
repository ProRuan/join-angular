import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro-header.component.html',
  styleUrl: './intro-header.component.scss',
})
export class IntroHeaderComponent {
  router: Router = inject(Router);

  @Input() type: string = '';

  // rename comp + functions (getClass())!!!
  // apply for sign-up comp!!!

  /**
   * Provides the css class of the subheader.
   * @returns - The css class to apply.
   */
  getClass() {
    return this.type == 'sign-up' ? 'sign-up' : 'login';
  }

  /**
   * Verifies the login type.
   * @returns - A boolean value.
   */
  isLogin() {
    return this.type == 'login';
  }

  /**
   * Navigates to the sign-up on click.
   */
  onClick() {
    this.router.navigateByUrl('sign-up');
  }
}
