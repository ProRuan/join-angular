import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinTitleComponent } from '../../join-title/join-title.component';
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { ButtonComponent } from '../../button/button.component';
import { contactDialogAnimation } from '../../../animations/contact-dialog.animation';
import { DialogFormController } from '../../../models/dialog-form-controller';
import { JoinService } from '../../../services/join.service';
import { InputConfigurationService } from '../../../services/input-configuration.service';
import { ContactService } from '../../../services/contact.service';
import { NameFormatterService } from '../../../services/name-formatter.service';
import { JoinButton } from '../../../models/join-button';
import { Contact } from '../../../models/contact';
import { ContactData } from '../../../interfaces/contact-data';
import { isDefaultString } from '../../../ts/global';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JoinTitleComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.scss',
  animations: [contactDialogAnimation],
})

/**
 * Class representing a contact dialog component.
 * @extends DialogFormController
 * @implements {OnChanges}
 */
export class ContactDialogComponent extends DialogFormController {
  join: JoinService = inject(JoinService);
  config: InputConfigurationService = inject(InputConfigurationService);
  viewer: ContactService = inject(ContactService);
  nameFormatter: NameFormatterService = inject(NameFormatterService);

  @Input() override id: string = '';

  title: string = '';
  subtitle: string = '';
  cancelBtn = new JoinButton('clearBtn');
  createBtn = new JoinButton('createBtn');
  deleteBtn = new JoinButton('deleteContactBtn');
  saveBtn = new JoinButton('createBtn', 'Save');

  defaultValue = { name: '', email: '', phone: '' };

  /**
   * Gets a contact to edit.
   * @returns The contact to edit.
   */
  get contact() {
    return this.viewer.cachedContact;
  }

  /**
   * Initializes a contact dialog component.
   */
  ngOnInit() {
    this.setDialog();
    this.setForm();
    this.setInputs();
    this.setButtonTexts();
  }

  /**
   * Sets a contact dialog.
   */
  setDialog() {
    if (this.isEditContactDialog()) {
      this.title = 'Edit contact';
    } else {
      this.title = 'Add contact';
      this.subtitle = 'Tasks are better with a team!';
    }
  }

  /**
   * Verifies an edit-contact dialog.
   * @returns A boolean value.
   */
  isEditContactDialog() {
    return this.id === 'editContact';
  }

  /**
   * Sets a form.
   */
  setForm() {
    this.registerControl('name', '');
    this.registerControl('email', '');
    this.registerControl('phone', '');
  }

  /**
   * Sets form inputs.
   */
  setInputs() {
    if (this.isEditContactDialog()) {
      this.form.patchValue(this.contact);
    }
  }

  /**
   * Sets the button texts.
   */
  setButtonTexts() {
    this.cancelBtn.text = 'Cancel';
    this.createBtn.text = 'Create contact';
  }

  /**
   * Closes dialogs on click.
   */
  onClose() {
    this.closeDialogs();
  }

  /**
   * Closes dialogs.
   */
  closeDialogs(saved: boolean = false) {
    let ids = this.getDialogIds(saved);
    if (saved) {
      this.dialogs.fadeOut(() => this.closeAndReset(ids, 100));
    } else {
      setTimeout(() => this.closeAndReset(ids, 300), 0);
    }
  }

  /**
   * Closes and resets dialogs.
   * @param ids - The dialog ids.
   * @param ms - The timeout in milliseconds.
   */
  closeAndReset(ids: string[], ms: number) {
    ids.forEach((id) => this.dialogs.close(id));
    setTimeout(() => this.viewer.cachedContact.set(), ms);
  }

  /**
   * Gets dialog ids.
   * @param saved - A boolean value.
   * @returns The dialog ids.
   */
  getDialogIds(saved: boolean) {
    return saved ? [this.id, 'contactSettings'] : [this.id];
  }

  /**
   * Gets the css class of a transit container.
   * @returns The css class of the transit container.
   */
  override getTransitClass(): string {
    if (this.isFadeClass()) {
      return 'fade';
    } else if (this.join.isMobile()) {
      return 'slide-y';
    } else {
      return 'slide-x';
    }
  }

  /**
   * Gets the css class of a dark container gap.
   * @returns The css class of the dark container gap.
   */
  getGapClass() {
    return this.isEditContactDialog() ? 'g-32' : '';
  }

  /**
   * Gets the css class of a profile background-color.
   * @returns The css class of the profile background-color.
   */
  getBgcClass() {
    let empty = isDefaultString(this.contact.bgc);
    return !empty ? this.contact.bgc : 'bgc-gray';
  }

  /**
   * Opens a delete-contact dialog on click.
   */
  onDelete() {
    this.dialogs.open('deleteContact');
  }

  /**
   * Saves a contact on click.
   */
  onSave() {
    if (this.form.valid) {
      this.updateContact();
      this.saveUserContacts(true);
    }
  }

  /**
   * Updates a contact.
   */
  updateContact() {
    let contact = this.viewer.contact;
    contact.name = this.getValue('name');
    contact.email = this.getValue('email');
    contact.phone = this.getValue('phone');
    contact.initials = this.nameFormatter.getInitials(contact.name);
  }

  /**
   * Saves user contacts.
   */
  saveUserContacts(saved: boolean) {
    this.viewer.updateContacts();
    this.join.saveUser();
    this.closeDialogs(saved);
  }

  /**
   * Creates a contact on click.
   */
  onCreate() {
    if (this.form.valid) {
      this.addContact();
      this.saveUserContacts(true);
    }
  }

  /**
   * Adds a contact.
   */
  addContact() {
    let contactData = this.getContactData();
    let contact = new Contact(contactData);
    this.join.addUserItem('contacts', contact);
    this.viewer.setContact(contact);
    this.dialogs.open('viewContact');
  }

  /**
   * Gets contact data.
   * @returns The contact data.
   */
  getContactData() {
    let contactData = this.form.value as ContactData;
    contactData.name = this.nameFormatter.getFormattedName(contactData.name);
    contactData.initials = this.nameFormatter.getInitials(contactData.name);
    return contactData;
  }
}
