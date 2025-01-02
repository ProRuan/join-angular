import { ContactData } from '../interfaces/contact-data';
import { getArray, getConvertedValues, getString } from '../ts/global';
import { Task } from './task';

/**
 * Represents a contact.
 */
export class Contact {
  initials: string;
  bgc: string;
  name: string;
  email: string;
  phone: string;
  tasks: Task[];

  /**
   * Creates a contact.
   * @param contact - The providing contact.
   */
  constructor(contact?: Contact | ContactData) {
    this.initials = getString(contact?.initials);
    this.bgc = getString(contact?.bgc);
    this.name = getString(contact?.name);
    this.email = getString(contact?.email);
    this.phone = getString(contact?.phone);
    this.tasks = getArray<Task>(contact?.tasks);
  }

  /**
   * Provides the contact as object.
   * @returns - The contact as object.
   */
  getObject() {
    let contact = { ...this };
    contact.tasks = getConvertedValues(this.tasks);
    return contact;
  }
}
