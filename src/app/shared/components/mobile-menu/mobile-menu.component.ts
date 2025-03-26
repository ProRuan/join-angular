import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})

/**
 * Class representing a mobile menu component.
 */
export class MobileMenuComponent {
  nav: NavigationService = inject(NavigationService);

  links = [
    { id: 'summary', img: 'summary_icon', text: 'Summary' },
    { id: 'board', img: 'board_icon', text: 'Board' },
    { id: 'add-task', img: 'task_icon', text: 'Add Tasks' },
    { id: 'contacts', img: 'contacts_icon', text: 'Contacts' },
  ];

  /**
   * Verifies the disabled state of a link.
   * @param id - The link id.
   * @returns A boolean value.
   */
  isDisabled(id: string) {
    return this.nav.isLinkActivated(id);
  }

  /**
   * Navigates to a component by link id.
   * @param id - The link id.
   */
  onNavigate(id: string) {
    this.nav.navigateByLink(id);
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
