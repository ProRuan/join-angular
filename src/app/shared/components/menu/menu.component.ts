import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})

/**
 * Class representing a menu component.
 */
export class MenuComponent {
  nav: NavigationService = inject(NavigationService);

  mainLinks = [
    { id: 'summary', img: 'summary_icon', text: 'Summary' },
    { id: 'add-task', img: 'task_icon', text: 'Add Task' },
    { id: 'board', img: 'board_icon', text: 'Board' },
    { id: 'contacts', img: 'contacts_icon', text: 'Contacts' },
  ];

  legalLinks = [
    { id: 'privacy-policy', text: 'Privacy Policy' },
    { id: 'legal-notice', text: 'Legal Notice' },
  ];

  /**
   * Gets the source path of a link icon.
   * @param img - The image name.
   * @returns The source path of the link icon.
   */
  getSrc(img: string) {
    return this.nav.getMenuSrc(img);
  }

  /**
   * Verifies the disabled state of a link.
   * @param id - The link id.
   * @returns A boolean value.
   */
  isDisabled(id: string) {
    return this.nav.isLinkActivated(id);
  }
}
