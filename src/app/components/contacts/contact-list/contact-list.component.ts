import { Component, Input } from '@angular/core';
import { ViewableContactComponent } from '../viewable-contact/viewable-contact.component';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../shared/models/contact';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ViewableContactComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent {
  contacts: Contact[] = [];
  @Input('contacts') set _contacts(contacts: Contact[]) {
    this.contacts = this.getSortedContacts(contacts);
  }
  // @Input() contacts: Contact[] = [];

  getSortedContacts(contacts: Contact[]) {
    let copiedContacts = [...contacts];
    return copiedContacts.sort((a, b) => a.name.localeCompare(b.name));
  }

  addContact() {}

  viewContact(event: Event) {}
}
