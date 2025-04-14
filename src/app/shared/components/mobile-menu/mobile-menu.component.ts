import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { JoinService } from '../../services/join.service';
import { NavButton } from '../../interfaces/nav-button';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, NavButtonComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})

/**
 * Class representing a mobile menu component.
 */
export class MobileMenuComponent {
  join: JoinService = inject(JoinService);

  mainLinks: NavButton[] = [
    { id: 'summary', img: 'summary_icon', text: 'Summary' },
    { id: 'board', img: 'board_icon', text: 'Board' },
    { id: 'add-task', img: 'task_icon', text: 'Add Tasks' },
    { id: 'contacts', img: 'contacts_icon', text: 'Contacts' },
  ];

  altLinks: NavButton[] = [
    { id: 'login', img: 'login_icon', text: 'Log In' },
    { id: 'dummy', text: 'dummy' },
    { id: 'privacy-policy', text: 'Privacy Policy' },
    { id: 'legal-notice', text: 'Legal Notice' },
  ];
}
