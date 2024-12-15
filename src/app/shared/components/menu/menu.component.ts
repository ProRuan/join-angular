import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainLinkComponent } from './main-link/main-link.component';
import { MainLink } from '../../interfaces/main-link';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, MainLinkComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})

/**
 * Represents a menu component.
 */
export class MenuComponent {
  mainLinks: MainLink[] = [
    {
      img: 'summary_icon',
      text: 'Summary',
      active: true,
    },
    {
      img: 'task_icon',
      text: 'Add task',
      active: false,
    },
    {
      img: 'board_icon',
      text: 'Board',
      active: false,
    },
    {
      img: 'contacts_icon',
      text: 'Contacts',
      active: false,
    },
  ];

  /**
   * Sets the main link active.
   * @param i - The main link index.
   */
  setLink(i: number) {
    this.resetLink();
    this.mainLinks[i].active = true;
  }

  /**
   * Resets the main links.
   */
  resetLink() {
    this.mainLinks.forEach((link) => {
      link.active = false;
    });
  }
}
