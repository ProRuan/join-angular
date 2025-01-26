import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ViewableContactComponent } from './viewable-contact/viewable-contact.component';
import { DialogEditContactService } from '../../shared/services/dialog-edit-contact.service';
import { DialogAddContactService } from '../../shared/services/dialog-add-contact.service';
import { JoinService } from '../../shared/services/join.service';
import { Contact } from '../../shared/models/contact';
import { ButtonData } from '../../shared/interfaces/button-data';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactViewerComponent } from './contact-viewer/contact-viewer.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactViewerComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  join: JoinService = inject(JoinService);
  decData: DialogEditContactService = inject(DialogEditContactService);
  dacData: DialogAddContactService = inject(DialogAddContactService);

  // set!!!
  addBtn: ButtonData = {
    buttonClass: 'create-btn',
    contClass: '',
    textClass: 'create-btn-text',
    text: 'Add new contact',
    imgClass: 'create-btn-img',
    src: '/assets/img/add-task/create_button.png',
    alt: 'create_button',
  };

  /**
   * Provides the user contacts.
   * @returns - The user contacts.
   */
  get contacts() {
    return this.join.user.contacts;
  }

  // editContact() {
  //   this.decData.setContact(this.currContact);
  //   this.decData.setColor(this.currColor);
  //   this.decData.open();
  // }
}
