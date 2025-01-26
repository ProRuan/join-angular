import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { ContactViewerComponent } from './contact-viewer/contact-viewer.component';
import { JoinService } from '../../shared/services/join.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    ContactListComponent,
    JoinTitleComponent,
    ContactViewerComponent,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})

/**
 * Represents a contact component.
 */
export class ContactsComponent {
  join: JoinService = inject(JoinService);

  title: string = 'Contacts';
  subtitle: string = 'Better with a team';

  /**
   * Provides the user contacts.
   * @returns - The user contacts.
   */
  get contacts() {
    return this.join.user.contacts;
  }
}
