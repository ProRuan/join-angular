import { getString } from '../ts/global';

/**
 * Represents a contact.
 */
export class Contact {
  initials: string;
  bgc: string;
  name: string;
  email: string;
  phone: string;

  /**
   * Creates a contact.
   * @param contact - The providing contact.
   */
  constructor(contact?: Contact) {
    this.initials = getString(contact?.initials);
    this.bgc = getString(contact?.bgc);
    this.name = getString(contact?.name);
    this.email = getString(contact?.email);
    this.phone = getString(contact?.phone);
  }
}
