import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContactService } from '../../../shared/services/contact.service';
import { ButtonData } from '../../../shared/interfaces/button-data';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-contact-viewer',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './contact-viewer.component.html',
  styleUrl: './contact-viewer.component.scss',
})
export class ContactViewerComponent {
  // rename?!
  viewer: ContactService = inject(ContactService);

  // add onEdit() + onDelete() ... (0/2)
  // edit-contact dialog ...
  // delete-contact dialog ...
  // add contact viewer transition ...
  // ButtonDataService ...

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

  editContact() {}

  // editContact() {
  //   this.decData.setContact(this.currContact);
  //   this.decData.setColor(this.currColor);
  //   this.decData.open();
  // }
}
