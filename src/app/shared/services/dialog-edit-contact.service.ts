import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogEditContactService {
  closed: boolean = true;

  contact = {
    initials: 'TW',
    name: 'Tatjana Wolf',
    email: 'wolf@gmail.com',
  };
  color: any;

  constructor() {}

  setContact(contact: any) {
    this.contact = contact;
  }

  // double code!!!
  setColor(color: any) {
    this.color = color;
  }

  open() {
    this.closed = false;
  }

  close() {
    this.closed = true;
  }
}
