import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JoinService } from '../../services/join.service';
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
  join: JoinService = inject(JoinService);
  nav: NavigationService = inject(NavigationService);

  mainLinks = [
    { id: 'summary', img: 'summary_icon', text: 'Summary' },
    { id: 'add-task', img: 'task_icon', text: 'Add Task' },
    { id: 'board', img: 'board_icon', text: 'Board' },
    { id: 'contacts', img: 'contacts_icon', text: 'Contacts' },
  ];

  altLinks = [{ id: 'login', img: 'login_icon', text: 'Log In' }];

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
   * Gets a link array.
   * @returns The link array.
   */
  getLinks() {
    return this.join.loggedIn ? this.mainLinks : this.altLinks;
  }

  /**
   * Gets a router link.
   * @param id - The link id.
   * @returns The router link.
   */
  getRouterLink(id: string) {
    return id === 'login' ? `/${id}` : id;
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
