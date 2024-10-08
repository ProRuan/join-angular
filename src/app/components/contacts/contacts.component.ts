import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ViewableContactComponent } from './viewable-contact/viewable-contact.component';
import { DialogEditContactService } from '../../shared/services/dialog-edit-contact.service';
import { DialogAddContactService } from '../../shared/services/dialog-add-contact.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ViewableContactComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  decData: DialogEditContactService = inject(DialogEditContactService);
  dacData: DialogAddContactService = inject(DialogAddContactService);

  // main object
  user = {
    id: '',
    sid: '',
    name: 'Rudolf Sachslehner',
    email: 'rudolf.sachslehner@join.com',
    password: 'test123!',
    summary: {},
    tasks: [],
    contacts: [],
  };

  currContact = {
    initials: 'AM',
    name: 'Anton Mayer',
    email: 'antonm@gmail.com',
  };
  currColor: string = '';

  // create contact service!!!
  // save contacts function!!!
  contacts = [
    {
      initials: 'AM',
      name: 'Anton Mayer',
      email: 'antonm@gmail.com',
    },
    {
      initials: 'AS',
      name: 'Anja Schulz',
      email: 'schulz@hotmail.com',
    },
    {
      initials: 'BZ',
      name: 'Benedikt Ziegler',
      email: 'benedikt@gmail.com',
    },
    {
      initials: 'DE',
      name: 'David Eisenberg',
      email: 'davidberg@gmail.com',
    },
    {
      initials: 'EF',
      name: 'Eva Fischer',
      email: 'eva@gmail.com',
    },
    {
      initials: 'EM',
      name: 'Emmanuel Mauer',
      email: 'emmanuelma@gmail.com',
    },
    {
      initials: 'MB',
      name: 'Marcel Bauer',
      email: 'bauer@gmail.com',
    },
    {
      initials: 'SM',
      name: 'Sofia Müller',
      email: 'müllergmail.com',
    },
    {
      initials: 'TW',
      name: 'Tatjana Wolf',
      email: 'wolf@gmail.com',
    },
  ];

  // work with modulo operator!!!
  colorSet = [
    'orange',
    'purple',
    'blue',
    'magenta',
    'yellow',
    'green',
    'dark-blue',
    'red',
    'cyan',
  ];

  viewContact(event: any) {
    // add phone numbers!!!
    this.currContact = event.contact;
    this.currColor = event.color;
    console.log('view contact: ', this.currContact);
  }

  editContact() {
    this.decData.setContact(this.currContact);
    this.decData.setColor(this.currColor);
    this.decData.open();
  }
}
