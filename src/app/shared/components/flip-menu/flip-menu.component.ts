import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { flipMenuAnimation } from '../../animations/flip-menu.animation';
import { DialogFormController } from '../../models/dialog-form-controller';
import { JoinService } from '../../services/join.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-flip-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flip-menu.component.html',
  styleUrl: './flip-menu.component.scss',
  animations: [flipMenuAnimation],
})

/**
 * Class representing a flip menu component.
 * @extends DialogFormController
 */
export class FlipMenuComponent extends DialogFormController {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  nav: NavigationService = inject(NavigationService);

  override id: string = 'flipMenu';

  /**
   * Closes a flip menu on click.
   */
  onClose() {
    this.close();
  }

  /**
   * Gets the css class of a flip menu.
   * @returns The css class of the flip menu.
   */
  getClass() {
    return this.isOpened() ? 'flip-out' : 'flip-in';
  }

  /**
   * Verifies the display state of a help link
   * @returns - A boolean value.
   */
  isDisplayed() {
    return this.join.isMobile();
  }

  /**
   * Navigates to a component by link id.
   * @param id - The link id.
   */
  onNavigate(id: string) {
    this.nav.navigateByLink(id);
    this.close();
  }

  /**
   * Logs out a user.
   */
  onLogOut() {
    this.router.navigateByUrl('login');
    this.close();
  }
}
