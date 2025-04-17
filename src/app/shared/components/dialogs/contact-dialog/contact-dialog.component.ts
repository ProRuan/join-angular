import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BacklogComponent } from '../../backlog/backlog.component';
import { JoinTitleComponent } from '../../join-title/join-title.component';
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { ButtonComponent } from '../../button/button.component';
import { contactDialogAnimation } from '../../../animations/contact-dialog.animation';
import { DialogFormController } from '../../../models/dialog-form-controller';
import { JoinService } from '../../../services/join.service';
import { InputConfigurationService } from '../../../services/input-configuration.service';
import { InputValidatorService } from '../../../services/input-validator.service';
import { ContactViewerService } from '../../../services/contact-viewer.service';
import { NameFormatterService } from '../../../services/name-formatter.service';
import { PhoneFormatterService } from '../../../services/phone-formatter.service';
import { JoinButton } from '../../../models/join-button';
import { Contact } from '../../../models/contact';
import { User } from '../../../models/user';
import { ContactData } from '../../../interfaces/contact-data';
import { isDefaultString } from '../../../ts/global';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BacklogComponent,
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
  validators: InputValidatorService = inject(InputValidatorService);
  viewer: ContactViewerService = inject(ContactViewerService);
  nameFormatter: NameFormatterService = inject(NameFormatterService);
  phoneFormatter: PhoneFormatterService = inject(PhoneFormatterService);

  @Input() override id: string = '';

  title: string = '';
  subtitle: string = '';
  cancelBtn = new JoinButton('clearBtn');
  createBtn = new JoinButton('createBtn');
  deleteBtn = new JoinButton('deleteContactBtn');
  saveBtn = new JoinButton('createBtn', 'Save');
  submitted: boolean = false;

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
    this.registerControl('name', '', this.validators.name);
    this.registerControl('email', '', this.validators.email);
    this.registerControl('phone', '', this.validators.phone);
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
   * Processes a form on submit.
   */
  onSubmit() {
    if (this.form.valid) {
      this.setSubmitted(true);
      this.isEditContactDialog() ? this.onSave() : this.onCreate();
    }
  }

  /**
   * Sets the submitted state of a form.
   * @param value - The value to set.
   */
  setSubmitted(value: boolean) {
    this.submitted = value;
  }

  /**
   * Saves a contact on click.
   */
  onSave() {
    this.isContactExisting(true) ? this.manageFeedback() : this.updateContact();
  }

  /**
   * Verifies an existing contact.
   * @returns A boolean value.
   */
  isContactExisting(contactEdited: boolean) {
    let email = this.getValue('email');
    let existing = this.join.isContactExisting(email);
    if (contactEdited) {
      return existing && !this.isViewedContact(email);
    } else {
      return existing;
    }
  }

  /**
   * Verifies a viewed contact.
   * @param email - The contact email.
   * @returns A boolean value.
   */
  isViewedContact(email: string) {
    return email === this.viewer.contact.email;
  }

  /**
   * Manages a user feedback.
   */
  manageFeedback() {
    this.dialogs.open('contactFeedback');
    setTimeout(() => this.dialogs.close('contactFeedback'), 900);
    setTimeout(() => this.setSubmitted(false), 1000);
  }

  /**
   * Updates a contact.
   */
  private updateContact() {
    let contact = this.viewer.contact;
    this.updateContactData(contact);
    this.updateUser();
    this.saveUserContacts(true);
  }

  /**
   * Updates contact data.
   * @param contact - The contact.
   */
  private updateContactData(contact: Contact | User) {
    contact.name = this.getFormattedName();
    contact.initials = this.getInitials(contact.name);
    contact.email = this.getEmail();
    contact.phone = this.getFormattedPhone();
  }

  /**
   * Gets a formatted contact name.
   * @param name - The contact.
   * @returns The formatted contact name.
   */
  private getFormattedName(contact?: ContactData) {
    let name = contact ? contact.name : this.getValue('name');
    return this.nameFormatter.getFormattedName(name);
  }

  /**
   * Gets contact initials.
   * @param name - The contact name.
   * @returns The contact initials.
   */
  private getInitials(name: string) {
    return this.nameFormatter.getInitials(name);
  }

  /**
   * Gets a contact email.
   * @param email - The contact.
   * @returns The contact email.
   */
  private getEmail(contact?: ContactData) {
    return contact ? contact.email : this.getValue('email');
  }

  /**
   * Gets a formatted phone number.
   * @param contact - The contact.
   * @returns The formatted phone number.
   */
  private getFormattedPhone(contact?: ContactData) {
    let phone = contact ? contact.phone : this.getValue('phone');
    return this.phoneFormatter.getFormattedPhone(phone);
  }

  /**
   * Update a user.
   */
  private updateUser() {
    if (this.isUser()) {
      this.updateContactData(this.join.user);
    }
  }

  /**
   * Verifies a user by contact.
   * @returns A boolean value.
   */
  private isUser() {
    return this.join.isUser(this.viewer.contact);
  }

  /**
   * Saves user contacts.
   */
  private saveUserContacts(saved: boolean) {
    this.viewer.updateContacts();
    this.join.saveUser();
    this.closeDialogs(saved);
  }

  /**
   * Creates a contact on click.
   */
  onCreate() {
    this.isContactExisting(false) ? this.manageFeedback() : this.addContact();
  }

  /**
   * Adds a contact.
   */
  private addContact() {
    let contactData = this.getContactData();
    let contact = new Contact(contactData);
    this.join.addUserItem('contacts', contact);
    this.viewer.setContact(contact);
    this.dialogs.open('viewContact');
    this.manageBacklog();
    this.saveUserContacts(true);
  }

  /**
   * Gets contact data.
   * @returns The contact data.
   */
  private getContactData() {
    let contactData = this.form.value as ContactData;
    contactData.name = this.getFormattedName(contactData);
    contactData.initials = this.getInitials(contactData.name);
    contactData.email = this.getEmail(contactData);
    contactData.phone = this.getFormattedPhone(contactData);
    return contactData;
  }

  /**
   * Manages a backlog.
   */
  private manageBacklog() {
    setTimeout(() => this.dialogs.open('backlog'), 100);
    setTimeout(() => this.dialogs.close('backlog'), 1100);
  }

  /**
   * Manages a contact deletion on click.
   */
  onDelete() {
    this.viewer.manageDeletion();
  }

  /**
   * Verifies the disabled state of a submit button.
   * @returns A boolean value.
   */
  isDisabled() {
    return this.form.invalid || this.submitted;
  }
}
