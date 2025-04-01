import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinTitleComponent } from '../../join-title/join-title.component';
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { ButtonComponent } from '../../button/button.component';
import { dialogAnimation } from '../../../animations/dialog.animation';
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
  animations: [dialogAnimation],
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
    if (this.isEditContactDialog()) {
      this.form.patchValue(this.contact); // to clean!!!
    }
    this.setButtonTexts();
  }

  setDialog() {
    if (this.isEditContactDialog()) {
      this.title = 'Edit contact';
    } else {
      this.title = 'Add contact';
      this.subtitle = 'Tasks are better with a team!';
    }
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
   * Sets the button texts.
   */
  setButtonTexts() {
    this.cancelBtn.text = 'Cancel';
    this.createBtn.text = 'Create contact';
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
   * Verifies an edit-contact dialog.
   * @returns A boolean value.
   */
  isEditContactDialog() {
    return this.id == 'editContact';
  }

  /**
   * Closes a dialog on click.
   */
  onClose() {
    this.closeDialog();
  }

  /**
   * Closes a dialog.
   */
  closeDialog() {
    this.close();
    this.viewer.cachedContact.set();
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
      this.saveUserContacts();
    }
  }

  /**
   * Updates a contact.
   */
  updateContact() {
    let contactData = this.getContactData();
    this.viewer.contact.set(contactData);
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

  /**
   * Saves user contacts.
   */
  saveUserContacts() {
    this.join.saveUser();
    setTimeout(() => this.closeDialog(), 0);
  }

  /**
   * Creates a contact on click.
   */
  onCreate() {
    if (this.form.valid) {
      this.addContact();
      this.saveUserContacts();
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
}
