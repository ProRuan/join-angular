import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { ContactViewerComponent } from './contact-viewer/contact-viewer.component';
import { JoinService } from '../../shared/services/join.service';
import { DialogService } from '../../shared/services/dialog.service';
import { DeleteContactDialogComponent } from './delete-contact-dialog/delete-contact-dialog.component';
import { AddContactDialogComponent } from './add-contact-dialog/add-contact-dialog.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    AddContactDialogComponent,
    DeleteContactDialogComponent,
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
  dialog: DialogService = inject(DialogService);

  // improve getSorted Contacts (initials, lastname) ... ?

  title: string = 'Contacts';
  subtitle: string = 'Better with a team';

  /**
   * Provides the user contacts.
   * @returns - The user contacts.
   */
  get contacts() {
    return this.join.user.contacts;
  }

  onClose() {
    this.dialog.close('addContact');
  }

  getVisClass(id: string) {
    let opened = this.dialog.isOpened(id);
    return !opened ? 'hidden' : '';
  }
}
