import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinTitleComponent } from '../../join-title/join-title.component';
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { ButtonComponent } from '../../button/button.component';
import { dialogAnimation } from '../../../animations/dialog.animation';
import { DialogFormController } from '../../../models/dialog-form-controller';
import { JoinService } from '../../../services/join.service';
import { InputConfigurationService } from '../../../services/input-configuration.service';
import { ContactService } from '../../../services/contact.service';
import { JoinButton } from '../../../models/join-button';
import { Contact } from '../../../models/contact';
import { getCurrentValue, isDefaultString } from '../../../ts/global';

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
export class ContactDialogComponent
  extends DialogFormController
  implements OnChanges
{
  join: JoinService = inject(JoinService);
  config: InputConfigurationService = inject(InputConfigurationService);
  viewer: ContactService = inject(ContactService);

  @Input() dialogId: string = 'addContact';

  defaultValue = { name: '', email: '', phone: '' };

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
    this.id = getCurrentValue<string>(changes, 'dialogId');
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
  onSave() {
    if (this.form.valid) {
      this.viewer.contact.set(this.form.value);
      this.saveUserContacts();
    }
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
      this.join.addUserItem('contacts', this.form.value);
      this.saveUserContacts();
    }
  }
}
