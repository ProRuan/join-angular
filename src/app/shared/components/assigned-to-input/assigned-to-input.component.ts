import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { AssignableContactComponent } from '../../../components/add-task/assignable-contact/assignable-contact.component';
import { DialogService } from '../../services/dialog.service';
import { Contact } from '../../models/contact';
import { stop } from '../../ts/global';

@Component({
  selector: 'app-assigned-to-input',
  standalone: true,
  imports: [CommonModule, LabelComponent, AssignableContactComponent],
  templateUrl: './assigned-to-input.component.html',
  styleUrl: './assigned-to-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, AssignedToInputComponent),
    getProvider(NG_VALUE_ACCESSOR, AssignedToInputComponent),
  ],
})

/**
 * Represents an assigned-to input component.
 * @extends - The BasicInput.
 */
export class AssignedToInputComponent extends BasicInput {
  dialog: DialogService = inject(DialogService);

  dialogId: string = 'assignedTo';

  @Input('contacts') assignableContacts: Contact[] = [];
  @Input('assignedTo') assignedContacts: Contact[] = [];
  @Output() assignedToChange = new EventEmitter<Contact[]>();

  /**
   * Handles the dialog on click.
   * @param event - The event.
   */
  onHandleDialog(event: Event) {
    this.dialog.close('category');
    stop(event);
  }

  /**
   * Provides the css class of the input focus.
   * @returns - The css class to apply.
   */
  getFocusClass() {
    return this.dialog.isOpened(this.dialogId) ? 'focus' : '';
  }

  /**
   * Provides the placeholder.
   * @returns - The placeholder.
   */
  getPlaceholder() {
    let opened = this.dialog.isOpened(this.dialogId);
    return !opened ? 'Select contacts to assign' : '';
  }

  /**
   * Opens the drop-down menu.
   */
  onOpenMenu() {
    this.dialog.close('category');
    this.dialog.open(this.dialogId);
  }

  /**
   * Provides the source path of the arrow.
   * @returns - The source path of the arrow.
   */
  getArrowSrc() {
    return this.dialog.getArrowSrc(this.dialogId);
  }

  /**
   * Switches the drop-down menu on click.
   */
  onSwitchMenu() {
    this.dialog.switch(this.dialogId);
  }

  /**
   * Provides the css class of the contact list.
   * @returns - The css class to apply.
   */
  getListClass() {
    return this.dialog.isOpened(this.dialogId) ? 'show' : '';
  }

  /**
   * Verifies the filtered contact.
   * @param name - The contact name.
   * @returns - A boolean value.
   */
  isFiltered(name: string) {
    if (name && this.value) {
      name = name.toLowerCase();
      let value = this.value.toLowerCase();
      return name.includes(value);
    } else {
      return name;
    }
  }

  /**
   * Assigns the contact on click.
   * @param i - The index of the assignable contact.
   */
  onAssignContact(i: number) {
    this.setContactAssigned(i);
    this.updateAssignedCocntacts();
  }

  /**
   * Sets the contact assigned.
   * @param i - The index of the assignable contact.
   */
  setContactAssigned(i: number) {
    let contact = this.assignableContacts[i];
    let contactAssigned = this.isAssigned(contact);
    !contactAssigned ? this.addContact(contact) : this.removeContact(contact);
  }

  /**
   * Verifies the assigned state of the contact.
   * @param contact - The assignable contact.
   * @returns A boolean value.
   */
  isAssigned(contact: Contact) {
    return this.assignedContacts.includes(contact);
  }

  /**
   * Adds the assignable contact to the task.
   * @param contact - The assignable contact.
   */
  addContact(contact: Contact) {
    this.assignedContacts.push(contact);
  }

  /**
   * Removes the assignable contact from the task.
   * @param contact - The assignable contact.
   */
  removeContact(contact: Contact) {
    let index = this.assignedContacts.indexOf(contact);
    if (index > -1) {
      this.assignedContacts.splice(index, 1);
    }
  }

  /**
   * Updates the assigned contacts.
   */
  updateAssignedCocntacts() {
    this.assignedContacts = this.getAssignedContacts();
    this.assignedToChange.emit(this.assignedContacts);
  }

  /**
   * Provides the assigned contacts.
   * @returns - The assigned contacts.
   */
  getAssignedContacts() {
    return this.assignableContacts.filter((c) => this.isAssigned(c));
  }

  /**
   * Verifies assigned contacts.
   * @returns - A boolean value.
   */
  isAnyContactAssigned() {
    return this.assignedContacts.length > 0 ? true : false;
  }
}
