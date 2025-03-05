import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { ContactViewerComponent } from './contact-viewer/contact-viewer.component';
import { JoinService } from '../../shared/services/join.service';
import { DialogService } from '../../shared/services/dialog.service';
import { DeleteContactDialogComponent } from './delete-contact-dialog/delete-contact-dialog.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { Contact } from '../../shared/models/contact';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    ContactDialogComponent,
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

  // ContactViewerService extends DialogService ... ?

  // set button h-25 for add-contact-btn ... !

  // rename contacts service to contact viewer service ... ?
  // move viewable contact component to contact list ... ?

  title: string = 'Contacts';
  subtitle: string = 'Better with a team';

  /**
   * Provides the user contacts.
   * @returns - The user contacts.
   */
  get contacts() {
    return this.join.user.contacts;
  }

  get dialogId() {
    return this.dialog.dialogId;
  }

  getSortedContacts() {
    let sortedContacts = [...this.contacts];
    return sortedContacts.sort((a, b) => this.compareNames(a, b));
  }

  /**
   * Compares names.
   * @param a - The name of contact a.
   * @param b - The name of contact b.
   * @returns A comparable figure.
   */
  compareNames(a: Contact, b: Contact) {
    let nameA = this.getComparableName(a.name);
    let nameB = this.getComparableName(b.name);
    return nameA.localeCompare(nameB);
  }

  /**
   * Gets the comparable name.
   * @param name - The contact name.
   * @returns The comparable name.
   */
  getComparableName(name: string) {
    if (name.includes(' ')) {
      let names = name.split(' ');
      let firstInitial = names[0][0];
      let lastName = names[1];
      return firstInitial + lastName;
    } else {
      return name;
    }
  }
}
