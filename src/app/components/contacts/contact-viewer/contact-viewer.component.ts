import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContactService } from '../../../shared/services/contact.service';
import { ButtonData } from '../../../shared/interfaces/button-data';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { JoinService } from '../../../shared/services/join.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { Contact } from '../../../shared/models/contact';

@Component({
  selector: 'app-contact-viewer',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './contact-viewer.component.html',
  styleUrl: './contact-viewer.component.scss',
})
export class ContactViewerComponent {
  join: JoinService = inject(JoinService);
  // rename?!
  viewer: ContactService = inject(ContactService);
  dialog: DialogService = inject(DialogService);

  // add contact viewer transition ...
  // ButtonDataService ...

  dialogId: string = 'editContact';

  editBtn: ButtonData = {
    buttonClass: 'settings-btn',
    contClass: 'w-31',
    textClass: 'settings-btn-text',
    text: 'Edit',
    imgClass: 'edit',
    src: '/assets/img/contacts/edit.png',
    alt: 'edit',
  };

  deleteBtn: ButtonData = {
    buttonClass: 'settings-btn',
    contClass: 'w-49',
    textClass: 'settings-btn-text',
    text: 'Delete',
    imgClass: 'delete',
    src: '/assets/img/contacts/delete.png',
    alt: 'delete',
  };

  get contact() {
    return this.viewer.contact;
  }

  onEdit() {
    // write set() on class Contacts!!!
    // reset contact and cached contact!!!
    this.viewer.cachedContact = new Contact(this.contact);
    this.dialog.dialogId = this.dialogId;
    this.dialog.title = 'Edit contact';
    this.dialog.open(this.dialogId);
  }

  onDelete() {
    this.dialog.open('deleteContact');
  }
}
