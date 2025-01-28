import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ViewableContactComponent } from '../viewable-contact/viewable-contact.component';
import { Contact } from '../../../shared/models/contact';
import { Register } from '../../../shared/interfaces/register';
import { ButtonData } from '../../../shared/interfaces/button-data';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ViewableContactComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})

/**
 * Represents a contact-list component.
 */
export class ContactListComponent {
  private sortedContacts: Contact[] = [];

  registerLetters: string[] = [];
  register: Register[] = [];

  addBtn: ButtonData = {
    buttonClass: 'create-btn add-new-contact-btn',
    contClass: 'h-25',
    textClass: 'create-btn-text',
    text: 'Add new contact',
    imgClass: 'img-32',
    src: '/assets/img/contacts/add_new_contact.png',
    alt: 'add_new_contact',
  };

  /**
   * Provides the contacts.
   * @returns - The contacts.
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
    this.sortedContacts.sort((a, b) => a.name.localeCompare(b.name));
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
   * Provides the initial of the contact name.
   * @param name - The contact name.
   * @returns - The initial.
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
   * Provides the section contacts.
   * @param letter - The section letter.
   * @returns - The section contacts.
   */
  getSectionContacts(letter: string) {
    return this.contacts.filter((c) => this.isFiltered(c, letter));
  }

  /**
   * Verifies the contact to filter.
   * @param contact - The contact.
   * @param letter - The section letter.
   * @returns - A boolean value.
   */
  isFiltered(contact: Contact, letter: string) {
    let initial = this.getInitial(contact.name);
    return initial == letter;
  }

  /**
   * Provides the section.
   * @param letter - The section letter.
   * @param contacts - The section contacts.
   * @returns - The section.
   */
  getSection(letter: string, contacts: Contact[]) {
    letter = letter.toUpperCase();
    return { letter: letter, contacts: contacts };
  }

  addContact() {}
}
