import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { ContactViewerComponent } from './contact-viewer/contact-viewer.component';
import { JoinService } from '../../shared/services/join.service';
import { DialogService } from '../../shared/services/dialog.service';
import { DeleteContactDialogComponent } from './delete-contact-dialog/delete-contact-dialog.component';
import { Contact } from '../../shared/models/contact';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    // DeleteContactDialogComponent,
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

  // DeleteContactComponent
  // ----------------------
  // reset/close contact viewer after deleting contact ...
  // combine delete-task/delete-contact dialog ... ?

  // ContactDialogComponent
  // ----------------------
  // getObjectArray(): remove front type ... !
  // set contact complete (with initials) ... !!!
  // set validators ... !
  // review onSave() ... !
  // check animation!!!
  // rename inputConfig to input ...
  // disable buttons ... ?!
  // set alternative buttons for add-task dialog like at contact dialog ... ?

  // input height: 50px ... ?
  // InputConfigurationService --> set phone input ...
  // CloseButtonComponent ... !
  // imgClasses: 24, 32, 64 ...
  // ProfileComponent with name and email ... ?

  // transition ... !
  // button validation ... (0/2)

  // delete task (show task title) ...
  // delete contact (show contact name or email) ...
  // check asset folder: img, font and so on ...

  // ContactViewerService extends DialogService ... ?

  // set button h-25 for add-contact-btn ... !
  // input h-50 ... ?

  // rename contacts service to contact viewer service ... ?
  // move viewable contact component to contact list ... ?

  // ContactViewerComponent
  // ----------------------
  // show on opened-contact only ... !
  // add contact viewer transition ...
  // write set() on class Contacts (for contact viewer at least)!!!
  // reset contact and cached contact!!!

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
