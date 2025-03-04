import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ContactService } from '../../../shared/services/contact.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { Contact } from '../../../shared/models/contact';
import { Register } from '../../../shared/interfaces/register';
import { JoinButton } from '../../../shared/models/join-button';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})

/**
 * Class representing a contact-list component.
 */
export class ContactListComponent {
  viewer: ContactService = inject(ContactService);
  dialog: DialogService = inject(DialogService);

  // set button h-25 ... !

  private sortedContacts: Contact[] = [];
  registerLetters: string[] = [];
  register: Register[] = [];
  dialogId: string = 'addContact';

  addBtn = new JoinButton('addBtn');

  /**
   * Gets the contacts.
   * @returns The contacts.
   */
  get contacts() {
    return this.sortedContacts;
  }

  /**
   * Sets the contacts.
   * @param - The user contacts.
   */
  @Input() set contacts(contacts: Contact[]) {
    this.setContactList(contacts);
  }

  /**
   * Sets the contact list.
   * @param contacts - The user contacts.
   */
  setContactList(contacts: Contact[]) {
    this.setSortedContacts(contacts);
    this.setRegisterLetters();
    this.setRegister();
  }

  /**
   * Sets the sorted contacts.
   * @param contacts - The user contacts.
   */
  setSortedContacts(contacts: Contact[]) {
    this.sortedContacts = [...contacts];
    this.sortedContacts.sort((a, b) => this.compareNames(a, b));
  }

  /**
   * Compares names.
   * @param a - The name of contact a.
   * @param b - The name of contact b.
   * @returns A comparable figure.
   */
  compareNames(a: Contact, b: Contact) {
    let nameA = this.getComparableName(a.name);
    let nameB = this.getComparableName(b.name);
    return nameA.localeCompare(nameB);
  }

  /**
   * Gets the comparable name.
   * @param name - The contact name.
   * @returns The comparable name.
   */
  getComparableName(name: string) {
    if (name.includes(' ')) {
      let names = name.split(' ');
      let firstInitial = names[0][0];
      let lastName = names[1];
      return firstInitial + lastName;
    } else {
      return name;
    }
  }

  /**
   * Sets the register letters.
   */
  setRegisterLetters() {
    this.contacts.forEach((contact) => {
      let initial = this.getInitial(contact.name);
      if (!this.registerLetters.includes(initial)) {
        this.registerLetters.push(initial);
      }
    });
  }

  /**
   * Gets the initial of the contact name.
   * @param name - The contact name.
   * @returns The initial.
   */
  getInitial(name: string) {
    name = name.toLowerCase();
    return name[0];
  }

  /**
   * Sets the register.
   */
  setRegister() {
    this.register = [];
    this.registerLetters.forEach((letter) => this.addSection(letter));
  }

  /**
   * Adds a register section.
   * @param letter - The section letter.
   */
  addSection(letter: string) {
    let contacts: Contact[] = this.getSectionContacts(letter);
    let section = this.getSection(letter, contacts);
    this.register.push(section);
  }

  /**
   * Gets the section contacts.
   * @param letter - The section letter.
   * @returns The section contacts.
   */
  getSectionContacts(letter: string) {
    return this.contacts.filter((c) => this.isFiltered(c, letter));
  }

  /**
   * Verifies the contact to filter.
   * @param contact - The contact.
   * @param letter - The section letter.
   * @returns A boolean value.
   */
  isFiltered(contact: Contact, letter: string) {
    let initial = this.getInitial(contact.name);
    return initial == letter;
  }

  /**
   * Gets the section.
   * @param letter - The section letter.
   * @param contacts - The section contacts.
   * @returns The section.
   */
  getSection(letter: string, contacts: Contact[]) {
    letter = letter.toUpperCase();
    return { letter: letter, contacts: contacts };
  }

  /**
   * Opens the add-contact dialog on click.
   */
  onAddContact() {
    this.dialog.dialogId = this.dialogId;
    this.dialog.title = 'Add contact';
    this.dialog.subtitle = 'Tasks are better with a team!';
    this.dialog.open(this.dialogId);
  }

  /**
   * Gets the css class of a contact.
   * @param contact - The contact.
   * @returns The css class of the contact.
   */
  getClass(contact: Contact) {
    let selected = this.isSelected(contact);
    return selected ? 'selected' : '';
  }

  /**
   * Verifies the selected state of a contact.
   * @param contact - The contact.
   * @returns A boolean value.
   */
  isSelected(contact: Contact) {
    let selectedContact = this.viewer.contact;
    return contact.email == selectedContact.email;
  }

  /**
   * Views a contact on click.
   * @param contact - The contact.
   */
  onView(contact: Contact) {
    if (!this.isSelected(contact)) {
      this.viewer.setContact(contact);
    } else {
      this.viewer.setContact();
    }
  }
}
