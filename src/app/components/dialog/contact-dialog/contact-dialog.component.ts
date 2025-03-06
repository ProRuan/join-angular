import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinTitleComponent } from '../../../shared/components/join-title/join-title.component';
import { TextInputComponent } from '../../../shared/components/inputs/text-input/text-input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { dialogAnimation } from '../../../shared/animations/dialog.animation';
import { JoinDialog } from '../../../shared/models/join-dialog';
import { JoinService } from '../../../shared/services/join.service';
import { ContactService } from '../../../shared/services/contact.service';
import { InputConfig } from '../../../shared/interfaces/input-config';
import { JoinButton } from '../../../shared/models/join-button';
import { Contact } from '../../../shared/models/contact';
import { getObjectArray, isDefaultString } from '../../../shared/ts/global';

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
 * @extends JoinDialog
 * @implements {OnChanges}
 */
export class ContactDialogComponent extends JoinDialog implements OnChanges {
  join: JoinService = inject(JoinService);
  viewer: ContactService = inject(ContactService);

  @Input() dialogId: string = 'addContact';

  defaultValue = { name: '', email: '', phone: '' };

  inputConfig: InputConfig[] = [
    { placeholder: 'Name', img: 'person', valOff: true },
    { placeholder: 'Email', img: 'email', valOff: true },
    { placeholder: 'Phone', img: 'phone', valOff: true },
  ];

  cancelBtn = new JoinButton('clearBtn');
  createBtn = new JoinButton('createBtn');
  deleteBtn = new JoinButton('deleteContactBtn');
  saveBtn = new JoinButton('createBtn', 'Save');

  /**
   * Gets a contact to edit.
   * @returns The contact to edit.
   */
  get contact() {
    return this.viewer.cachedContact;
  }

  /**
   * Updates a contact dialog component on changes.
   * @param changes - The changes.
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.id = changes['dialogId'].currentValue;
    if (this.isEditContactDialog()) {
      this.form.patchValue(this.contact);
    } else {
      this.form.reset(this.defaultValue);
    }
  }

  /**
   * Initializes a contact dialog component.
   */
  ngOnInit() {
    this.setForm();
    this.setButtonTexts();
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
    this.dialog.close(this.dialogId);
    this.dialog.title = '';
    this.dialog.subtitle = '';
    this.viewer.cachedContact = new Contact();
  }

  /**
   * Opens a delete-contact dialog on click.
   */
  onDelete() {
    this.dialog.open('deleteContact');
  }

  /**
   * Saves a contact on click.
   */
  async onSave() {
    if (this.form.valid) {
      this.viewer.contact.set(this.form.value);
      await this.saveUserContacts();
      this.closeDialog();
    }
  }

  /**
   * Saves user contacts.
   */
  async saveUserContacts() {
    let id = this.join.user.id;
    let contacts = getObjectArray<Contact>(this.join.user.contacts, Contact);
    await this.join.updateUser(id, 'data.contacts', contacts);
    this.join.saveUserLocally();
  }

  /**
   * Creates a contact on click.
   */
  async onCreate() {
    if (this.form.valid) {
      this.join.user.contacts.push(this.form.value);
      await this.saveUserContacts();
      this.closeDialog();
    }
  }
}
