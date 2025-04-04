import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContactDialogComponent } from '../../shared/components/dialogs/contact-dialog/contact-dialog.component';
import { DeleteContactDialogComponent } from '../../shared/components/dialogs/delete-contact-dialog/delete-contact-dialog.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { ContactViewerComponent } from './contact-viewer/contact-viewer.component';
// import { ButtonComponent } from '../../shared/components/button/button.component';
import { JoinService } from '../../shared/services/join.service';
import { ContactService } from '../../shared/services/contact.service';
import { DialogService } from '../../shared/services/dialog.service';
import { Contact } from '../../shared/models/contact';
import { getArrayCopy } from '../../shared/ts/global';
import { ContactSettingsDialogComponent } from '../../shared/components/dialogs/contact-settings-dialog/contact-settings-dialog.component';

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
    ContactSettingsDialogComponent,
    // ButtonComponent,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})

/**
 * Class representing a contact component.
 */
export class ContactsComponent {
  join: JoinService = inject(JoinService);
  viewer: ContactService = inject(ContactService);
  dialogs: DialogService = inject(DialogService);

  // move onEdit() and onDelete() to contact viewer ...
  // user join button ... ?!

  title: string = 'Contacts';
  subtitle: string = 'Better with a team';
  dialogId: string = 'viewContact';

  /**
   * Verifies the display state of a contact list.
   * @returns A boolean value.
   */
  isDisplayed() {
    return !this.isContactListHidden();
  }

  /**
   * Verifies the hidden state of a contact list.
   * @returns A boolean value.
   */
  isContactListHidden() {
    return this.isOpened() && this.join.isMobile();
  }

  /**
   * Verifies the opened state of a contact viewer.
   * @returns A boolean value.
   */
  isOpened() {
    return this.dialogs.isOpened(this.dialogId);
  }

  /**
   * Gets sorted contacts.
   * @returns The sorted contacts.
   */
  getSortedContacts() {
    let contacts = getArrayCopy(this.join.user.contacts);
    return contacts.sort((a, b) => this.compareNames(a, b));
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
   * Gets a comparable name.
   * @param name - The contact name.
   * @returns The comparable name.
   */
  getComparableName(name: string) {
    return name.includes(' ') ? this.getSortableName(name) : name;
  }

  /**
   * Gets a sortable name.
   * @param name - The contact name.
   * @returns The sortable name.
   */
  getSortableName(name: string) {
    let names = name.split(' ');
    let firstInitial = names[0].charAt(0);
    let lastName = names[1];
    return firstInitial + lastName;
  }

  /**
   * Closes a contact viewer on click.
   */
  onClose() {
    this.dialogs.close(this.dialogId);
    this.viewer.setContact();
  }

  // jsdoc
  onSet() {
    this.dialogs.open('contactSettings');
  }
}
