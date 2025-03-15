import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { fadeAnimation } from '../../../shared/animations/fade-animation';
import { DialogFormController } from '../../../shared/models/dialog-form-controller';
import { JoinService } from '../../../shared/services/join.service';
import { ContactService } from '../../../shared/services/contact.service';
import { JoinButton } from '../../../shared/models/join-button';

@Component({
  selector: 'app-delete-contact-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './delete-contact-dialog.component.html',

  styleUrl: './delete-contact-dialog.component.scss',
  animations: [fadeAnimation],
})

/**
 * Class representing a delete-contact dialog component.
 * @extends DialogFormController
 */
export class DeleteContactDialogComponent extends DialogFormController {
  join: JoinService = inject(JoinService);
  viewer: ContactService = inject(ContactService);

  noBtn = new JoinButton('clearBtn', 'No');
  yesBtn = new JoinButton('createBtn', 'Yes');

  override id: string = 'deleteContact';

  /**
   * Closes a dialog on click.
   */
  onClose(event: Event) {
    this.close(event);
  }

  /**
   * Deletes a contact on click.
   */
  onDelete() {
    let index = this.getContactIndex();
    if (index > -1) {
      this.deleteContact(index);
    }
  }

  /**
   * Gets a contact index.
   * @returns - The contact index.
   */
  getContactIndex() {
    return this.join.user.contacts.indexOf(this.viewer.contact);
  }

  /**
   * Deletes a contact.
   * @param index - The contact index.
   */
  deleteContact(index: number) {
    this.dialog.fadedOut = true;
    setTimeout(() => {
      this.closesDialogs();
      this.join.deleteUserItem('contacts', index);
      this.join.saveUser();
      this.dialog.fadedOut = false;
    }, 0);
  }

  /**
   * Closes all open dialogs.
   */
  closesDialogs() {
    this.close();
    this.dialog.close('editContact');
  }
}
