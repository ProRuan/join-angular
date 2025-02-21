import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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
  router: Router = inject(Router);

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
    return `./assets/img/menu/${img}.png`;
  }

  /**
   * Verifies the disabled state of a link.
   * @param id - The link id.
   * @returns A boolean value.
   */
  isDisabled(id: string) {
    return this.router.url.endsWith(id);
  }
}
