import { Component, Input } from '@angular/core';
import { ViewableContactComponent } from '../viewable-contact/viewable-contact.component';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../shared/models/contact';
import { ButtonData } from '../../../shared/interfaces/button-data';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ViewableContactComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent {
  private sortedContacts: Contact[] = [];

  get contacts() {
    return this.sortedContacts;
  }

  @Input('contacts') set contacts(contacts: Contact[]) {
    this.sortedContacts = this.getSortedContacts(contacts);
  }

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

  getSortedContacts(contacts: Contact[]) {
    let copiedContacts = [...contacts];
    return copiedContacts.sort((a, b) => a.name.localeCompare(b.name));
  }

  addContact() {}

  viewContact(event: Event) {}
}
