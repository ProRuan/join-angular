import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JoinService } from '../../services/join.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-flip-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './flip-menu.component.html',
  styleUrl: './flip-menu.component.scss',
})

/**
 * Class representing a flip menu component.
 */
export class FlipMenuComponent {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  dialog: DialogService = inject(DialogService);

  /**
   * Gets the css class of a flip menu.
   * @returns The css class of the flip menu.
   */
  getClass() {
    let opened = this.dialog.isOpened('flipMenu');
    return opened ? 'flip-out' : 'flip-in';
  }

  /**
   * Verifies the display state of a help link
   * @returns - A boolean value.
   */
  isDisplayed() {
    let help = this.router.url.endsWith('help');
    let tablet = this.join.windowWidth <= 1280;
    return !help && tablet;
  }
}
