import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DialogFormController } from '../../../models/dialog-form-controller';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../../models/contact';

@Component({
  selector: 'app-contact-settings-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-settings-dialog.component.html',
  styleUrl: './contact-settings-dialog.component.scss',
})
export class ContactSettingsDialogComponent extends DialogFormController {
  viewer: ContactService = inject(ContactService);

  // set z-index ... !

  override id: string = 'contactSettings';

  onClose() {
    this.close();
  }

  // double code + set data!!!
  // set dialog animation!
  // keep viewer on closing dialog!
  onEdit() {
    // this.viewer.setContact(contact);
    this.viewer.cachedContact = new Contact(this.viewer.contact);

    // this.viewer.cachedContact = new Contact(this.contact);
    this.dialogs.id = 'editContact';
    this.dialogs.title = 'Edit contact';
    this.dialogs.open('editContact');
    this.dialogs.close('contactSettings');
  }

  // double code!!!
  onDelete() {
    this.dialogs.open('deleteContact');
    this.dialogs.close('contactSettings');
  }
}
