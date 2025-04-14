import { Component, inject } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-back-arrow-button',
  standalone: true,
  imports: [],
  templateUrl: './back-arrow-button.component.html',
  styleUrl: './back-arrow-button.component.scss',
})

/**
 * Class representing a back arrow button component.
 */
export class BackArrowButtonComponent {
  nav: NavigationService = inject(NavigationService);

  /**
   * Navigates back to the previous component.
   */
  onBack() {
    this.nav.navigateBack();
  }
}
