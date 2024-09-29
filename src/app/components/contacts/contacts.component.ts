import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  currContact = {
    initials: 'AM',
    name: 'Anton Mayer',
    email: 'antonm@gmail.com',
  };

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

  viewContact() {
    // set index or component!!!
    // add phone numbers!!!
    this.currContact = this.contacts[8];
    console.log('view contact: ', this.currContact);
  }
}
