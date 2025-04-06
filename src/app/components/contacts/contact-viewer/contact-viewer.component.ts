import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { JoinTitleComponent } from '../../../shared/components/join-title/join-title.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { DialogFormController } from '../../../shared/models/dialog-form-controller';
import { JoinService } from '../../../shared/services/join.service';
import { ContactService } from '../../../shared/services/contact.service';
import { JoinButton } from '../../../shared/models/join-button';

@Component({
  selector: 'app-contact-viewer',
  standalone: true,
  imports: [CommonModule, JoinTitleComponent, ButtonComponent],
  templateUrl: './contact-viewer.component.html',
  styleUrl: './contact-viewer.component.scss',
})

/**
 * Class representing a contact viewer component.
 * @implements {DialogFormController}
 */
export class ContactViewerComponent extends DialogFormController {
  join: JoinService = inject(JoinService);
  viewer: ContactService = inject(ContactService);

  override id: string = 'viewContact';

  title: string = 'Contacts';
  subtitle: string = 'Better with a team';
  editBtn = new JoinButton('editBtn');
  deleteBtn = new JoinButton('deleteBtn');

  /**
   * Gets a contact to view.
   * @returns The contact to view.
   */
  get contact() {
    return this.viewer.contact;
  }

  /**
   * Closes a dialog on click.
   */
  onClose() {
    this.close();
    this.viewer.setContact();
  }

  /**
   * Opens an edit-contact dialog on click.
   */
  onEdit() {
    this.viewer.cachedContact.set(this.contact);
    this.dialogs.open('editContact');
  }

  /**
   * Opens a delete-contact dialog on click.
   */
  onDelete() {
    this.dialogs.open('deleteContact');
  }

  /**
   * Opens a contact settings dialog on click.
   */
  onSet() {
    this.dialogs.open('contactSettings');
  }
}
