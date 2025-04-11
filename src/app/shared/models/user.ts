import { ContactData } from '../interfaces/contact-data';
import { SummaryData } from '../interfaces/summary-data';
import { UserData } from '../interfaces/user-data';
import {
  getCustomArray,
  getObjectArray,
  getObjectData,
  getString,
} from '../ts/global';
import { Contact } from './contact';
import { Summary } from './summary';
import { Task } from './task';

/**
 * Class representing a user.
 */
export class User {
  [key: string]: any;
  id: string = '';
  initials: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  summary: Summary = new Summary();
  tasks: Task[] = [];
  contacts: Contact[] = [];

  /**
   * Creates a user.
   * @param data - The user data.
   */
  constructor(data?: User | UserData) {
    this.assignValues(data);
  }

  /**
   * Assigns property values.
   * @param data - The user data.
   */
  private assignValues(data?: User | UserData) {
    this.id = getString(data?.id);
    this.initials = getString(data?.initials);
    this.name = getString(data?.name);
    this.email = getString(data?.email);
    this.phone = getString(data?.phone);
    this.password = getString(data?.password);
    this.summary = this.getSummary(data?.summary);
    this.tasks = getCustomArray(data?.tasks, Task);
    this.contacts = getCustomArray(data?.contacts, Contact);
  }

  /**
   * Sets a user.
   * @param data - The user data.
   */
  set(data?: User | UserData) {
    this.assignValues(data);
  }

  /**
   * Gets a user summary.
   * @returns The user summary.
   */
  private getSummary(data?: Summary | SummaryData) {
    return data ? new Summary(data) : new Summary();
  }

  /**
   * Gets a user as object.
   * @returns The user as object.
   */
  getObject() {
    let data = getObjectData(this) as UserData;
    data.summary = this.summary.getObject();
    data.tasks = getObjectArray(this.tasks);
    data.contacts = getObjectArray(this.contacts);
    return data;
  }

  /**
   * Gets a user as contact.
   * @returns The user as contact.
   */
  getContact() {
    let data = this.getContactData();
    return new Contact(data);
  }

  /**
   * Gets a user as contact data.
   * @returns The user as contact data.
   */
  private getContactData() {
    return {
      id: this.id,
      initials: this.initials,
      bgc: 'lightblue',
      name: this.name,
      email: this.email,
      phone: this.phone,
    } as ContactData;
  }
}
