import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

/**
 * Represents a header component.
 */
export class HeaderComponent {
  router: Router = inject(Router);

  @Input() type: string = '';

  /**
   * Provides the css class of the header.
   * @returns - The css class to apply.
   */
  getClass() {
    return this.isType('sign-up') ? 'sign-up' : 'login';
  }

  /**
   * Verifies the header type.
   * @param type - The header type to match.
   * @returns - A boolean value.
   */
  isType(type: string) {
    return this.type == type;
  }

  /**
   * Navigates to the sign-up on click.
   */
  onClick() {
    this.router.navigateByUrl('sign-up');
  }
}
