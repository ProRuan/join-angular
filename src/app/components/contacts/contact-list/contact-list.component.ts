import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ContactService } from '../../../shared/services/contact.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { Contact } from '../../../shared/models/contact';
import { Register } from '../../../shared/interfaces/register';
import { JoinButton } from '../../../shared/models/join-button';
import {
  getCapitalized,
  getCurrentValue,
  getInitial,
} from '../../../shared/ts/global';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})

/**
 * Class representing a contact list component.
 * @implements {OnChanges}
 */
export class ContactListComponent implements OnChanges {
  viewer: ContactService = inject(ContactService);
  dialogs: DialogService = inject(DialogService);

  @Input() contacts: Contact[] = [];

  registerLetters: string[] = [];
  register: Register[] = [];
  dialogId: string = 'addContact';
  addBtn = new JoinButton('addBtn');

  /**
   * Updates a contact list component on changes.
   * @param changes - The changes.
   */
  ngOnChanges(changes: SimpleChanges): void {
    let contacts = getCurrentValue<Contact[]>(changes, 'contacts');
    this.updateRegisterLetters(contacts);
    this.updateRegister();
  }

  /**
   * Updates register letters.
   * @param contacts - The contacts.
   */
  updateRegisterLetters(contacts: Contact[]) {
    this.registerLetters = [];
    contacts.forEach((contact) => this.addRegisterLetter(contact));
  }

  /**
   * Adds a register letter.
   * @param contact - The contact.
   */
  addRegisterLetter(contact: Contact) {
    let initial = getInitial(contact.name);
    if (!this.registerLetters.includes(initial)) {
      this.registerLetters.push(initial);
    }
  }

  /**
   * Updates a register.
   */
  updateRegister() {
    this.register = this.registerLetters.map((l) => this.addSection(l));
  }

  /**
   * Adds a register section.
   * @param letter - The section letter.
   */
  addSection(letter: string) {
    let contacts = this.getSectionContacts(letter);
    letter = getCapitalized(letter);
    return this.getSection(letter, contacts);
  }

  /**
   * Gets section contacts.
   * @param letter - The section letter.
   * @returns The section contacts.
   */
  getSectionContacts(letter: string) {
    return this.contacts.filter((c) => this.isFiltered(c, letter));
  }

  /**
   * Verifies a contact to filter.
   * @param contact - The contact.
   * @param letter - The section letter.
   * @returns A boolean value.
   */
  isFiltered(contact: Contact, letter: string) {
    let initial = getInitial(contact.name);
    return initial == letter;
  }

  /**
   * Gets a section.
   * @param letter - The section letter.
   * @param contacts - The section contacts.
   * @returns The section.
   */
  getSection(letter: string, contacts: Contact[]) {
    return { letter: letter, contacts: contacts };
  }

  /**
   * Opens an add-contact dialog on click.
   */
  onAdd() {
    this.dialogs.open(this.dialogId);
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
      this.dialogs.open('viewContact');
    } else {
      this.dialogs.close('viewContact');
      this.viewer.setContact();
    }
  }
}
