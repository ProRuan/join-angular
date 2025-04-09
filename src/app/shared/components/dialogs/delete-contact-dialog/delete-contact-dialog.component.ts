import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { dialogAnimation } from '../../../animations/dialog.animation';
import { DialogFormController } from '../../../models/dialog-form-controller';
import { JoinService } from '../../../services/join.service';
import { ContactService } from '../../../services/contact.service';
import { JoinButton } from '../../../models/join-button';

@Component({
  selector: 'app-delete-contact-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './delete-contact-dialog.component.html',

  styleUrl: './delete-contact-dialog.component.scss',
  animations: [dialogAnimation],
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
    this.dialogs.fadeOut(() => this.deleteAndSave(index));
  }

  /**
   * Deletes a contact and updates the user.
   * @param index - The contact index.
   */
  deleteAndSave(index: number) {
    this.closesDialogs();
    this.join.deleteUserItem('contacts', index);
    this.viewer.reset();
    this.join.saveUser();
  }

  /**
   * Closes all open dialogs.
   */
  closesDialogs() {
    let ids = this.getDialogIds();
    ids.forEach((id) => this.dialogs.close(id));
  }

  /**
   * Gets dialog ids.
   * @returns The dialog ids.
   */
  private getDialogIds() {
    return [this.id, 'editContact', 'contactSettings', 'viewContact'];
  }
}
