import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { JoinService } from '../../../shared/services/join.service';
import { ContactService } from '../../../shared/services/contact.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { JoinButton } from '../../../shared/models/join-button';

@Component({
  selector: 'app-contact-viewer',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './contact-viewer.component.html',
  styleUrl: './contact-viewer.component.scss',
})

/**
 * Class representing a contact viewer component.
 */
export class ContactViewerComponent {
  join: JoinService = inject(JoinService);
  viewer: ContactService = inject(ContactService);
  dialogs: DialogService = inject(DialogService);

  dialogId: string = 'editContact';
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
   * Opens an edit-contact dialog on click.
   */
  onEdit() {
    this.viewer.cachedContact.set(this.contact);
    this.dialogs.open(this.dialogId);
  }

  /**
   * Opens a delete-contact dialog on click.
   */
  onDelete() {
    this.dialogs.open('deleteContact');
  }
}
