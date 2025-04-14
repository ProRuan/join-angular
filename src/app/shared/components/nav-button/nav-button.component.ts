import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { NavButton } from '../../interfaces/nav-button';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
})

/**
 * Class representing a navigation button.
 */
export class NavButtonComponent {
  router: Router = inject(Router);
  nav: NavigationService = inject(NavigationService);

  @Input() button!: NavButton;

  /**
   * Gets the css class of a button.
   * @returns The css class of the button.
   */
  getClass() {
    return this.isDummyButton() ? 'dummy-button' : 'button';
  }

  /**
   * Verifies a dummy button.
   * @returns A boolean value.
   */
  isDummyButton() {
    return this.button.id === 'dummy';
  }

  /**
   * Verifies the disabled state of a link.
   * @param id - The link id.
   * @returns A boolean value.
   */
  isDisabled(id: string) {
    return this.nav.isLinkActivated(id) || this.isDummyButton();
  }

  /**
   * Navigates to a component by link id.
   * @param id - The link id.
   */
  onNavigate(id: string) {
    if (id === 'login') {
      this.router.navigateByUrl('/login');
    } else {
      this.nav.navigateByLink(id);
    }
  }

  /**
   * Gets the source path of an icon.
   * @param img - The image name.
   * @returns The source path of the icon.
   */
  getSrc(img: string) {
    return this.nav.getMenuSrc(img);
  }
}
