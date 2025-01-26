import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a contact service.
 */
export class ContactService {
  contact: Contact = new Contact();
  defaultContact: Contact = new Contact();

  /**
   * Sets this contact.
   * @param contact - The contact.
   */
  setContact(contact?: Contact) {
    this.contact = contact ? contact : this.defaultContact;
  }
}
