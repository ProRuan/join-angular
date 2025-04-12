import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContactSettingsDialogComponent } from '../../shared/components/dialogs/contact-settings-dialog/contact-settings-dialog.component';
import { ContactDialogComponent } from '../../shared/components/dialogs/contact-dialog/contact-dialog.component';
import { DeleteContactDialogComponent } from '../../shared/components/dialogs/delete-contact-dialog/delete-contact-dialog.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactViewerComponent } from './contact-viewer/contact-viewer.component';
import { JoinService } from '../../shared/services/join.service';
import { ContactViewerService } from '../../shared/services/contact-viewer.service';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    ContactSettingsDialogComponent,
    ContactDialogComponent,
    DeleteContactDialogComponent,
    ContactListComponent,
    ContactViewerComponent,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})

/**
 * Class representing a contact component.
 */
export class ContactsComponent {
  join: JoinService = inject(JoinService);
  viewer: ContactViewerService = inject(ContactViewerService);
  dialogs: DialogService = inject(DialogService);

  /**
   * Verifies the opened state of a dialog.
   * @param id - The dialog id.
   * @returns A boolean value.
   */
  isOpened(id: string) {
    return this.dialogs.isOpened(id);
  }

  /**
   * Verifies the display state of a contact list.
   * @returns A boolean value.
   */
  isListDisplayed() {
    return !this.isOpened('viewContact') || !this.join.isMobile();
  }

  /**
   * Verifies the display state of a contact viewer.
   * @returns A boolean value.
   */
  isViewerDisplayed() {
    return this.isOpened('viewContact') || !this.join.isMobile();
  }

  /**
   * Gets sorted user contacts.
   * @returns The sorted user contacts.
   */
  getContacts() {
    let contacts = this.join.getContacts();
    return this.viewer.getSortedContacts(contacts);
  }
}
