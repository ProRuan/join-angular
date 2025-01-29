import { ContactData } from '../interfaces/contact-data';
import { getId, getObject, getString } from '../ts/global';

/**
 * Represents a contact.
 */
export class Contact {
  id!: string;
  initials!: string;
  bgc!: string;
  name!: string;
  email!: string;
  phone!: string;

  /**
   * Creates a contact.
   * @param data - The contact data.
   */
  constructor(data?: Contact | ContactData) {
    this.assignValues(data);
  }

  /**
   * Assigns the property values.
   * @param data - The contact data.
   */
  private assignValues(data?: Contact | ContactData) {
    this.id = getId(data?.id);
    this.initials = getString(data?.initials);
    this.bgc = getString(data?.bgc);
    this.name = getString(data?.name);
    this.email = getString(data?.email);
    this.phone = getString(data?.phone);
  }

  /**
   * Sets the contact data.
   * @param data - The contact data.
   */
  set(data?: Contact | ContactData) {
    this.assignValues(data);
  }

  /**
   * Provides the contact as object.
   * @returns - The contact as object.
   */
  getObject() {
    return getObject<Contact>(this);
  }
}
