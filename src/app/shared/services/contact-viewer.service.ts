import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JoinService } from './join.service';
import { DialogService } from './dialog.service';
import { Contact } from '../models/contact';
import { JoinButton } from '../models/join-button';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a contact viewer service.
 */
export class ContactViewerService {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  dialogs: DialogService = inject(DialogService);

  contact = new Contact();
  cachedContact = new Contact();
  defaultContact = new Contact();
  deleteBtn = new JoinButton('deleteBtn');
  deleteContactBtn = new JoinButton('deleteContactBtn');
  contactDeleteBtn = new JoinButton('contactDeleteBtn');

  bgColors = [
    'orange',
    'purple',
    'blue',
    'magenta',
    'yellow',
    'green',
    'dark-blue',
    'cyan',
    'red',
  ];

  /**
   * Sets a contact to view.
   * @param contact - The contact to set.
   */
  setContact(contact?: Contact) {
    this.contact = contact ? contact : this.defaultContact;
  }

  /**
   * Gets sorted contacts.
   * @param contacts - The contacts to sort.
   * @returns The sorted contacts.
   */
  getSortedContacts(contacts: Contact[]) {
    return contacts.sort((a, b) => this.compareNames(a, b));
  }

  /**
   * Compares names.
   * @param a - The contact name a.
   * @param b - The contact name b.
   * @returns A comparable figure.
   */
  private compareNames(a: Contact, b: Contact) {
    let nameA = this.getComparableName(a.name);
    let nameB = this.getComparableName(b.name);
    return nameA.localeCompare(nameB);
  }

  /**
   * Gets a comparable name.
   * @param name - The contact name.
   * @returns The comparable name.
   */
  private getComparableName(name: string) {
    return name.includes(' ') ? this.getSortableName(name) : name;
  }

  /**
   * Gets a sortable name.
   * @param name - The contact name.
   * @returns The sortable name.
   */
  private getSortableName(name: string) {
    let names = name.split(' ');
    let firstInitial = names[0].charAt(0);
    let lastName = names[1];
    return firstInitial + lastName;
  }

  /**
   * Updates user contacts.
   */
  updateContacts() {
    let contacts = this.join.user.contacts;
    let sortedContacts = this.getSortedContacts(contacts);
    this.updateContactBgc(sortedContacts);
  }

  /**
   * Updates contact background colors.
   * @param contacts - The contacts.
   */
  private updateContactBgc(contacts: Contact[]) {
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      let bgc = this.getBgc(i);
      contact.bgc = bgc;
    }
  }

  /**
   * Gets a background color.
   * @param i - The contact index.
   * @returns The background color.
   */
  private getBgc(i: number) {
    let index = i % this.bgColors.length;
    return this.bgColors[index];
  }

  /**
   * Resets a contact viewer.
   */
  reset() {
    this.setContact();
    this.cachedContact.set();
    this.updateContacts();
  }

  /**
   * Sets delete buttons.
   */
  setDeleteButtons() {
    if (this.isUser()) {
      this.setDeleteButtonTexts('Sign out');
    } else {
      this.setDeleteButtonTexts('Delete');
    }
  }

  /**
   * Sets delete button texts.
   * @param text - The text to set.
   */
  private setDeleteButtonTexts(text: string) {
    this.deleteBtn.text = text;
    this.deleteContactBtn.text = text;
    this.contactDeleteBtn.text = text;
  }

  /**
   * Manages a contact deletion.
   */
  manageDeletion() {
    if (this.isUser()) {
      this.router.navigate(['sign-out', this.contact.id]);
    } else {
      this.dialogs.open('deleteContact');
    }
  }

  /**
   * Verifies a user by contact.
   * @returns A boolean value.
   */
  isUser() {
    return this.join.isUser(this.contact);
  }
}
