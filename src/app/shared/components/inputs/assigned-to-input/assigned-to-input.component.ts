import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { LabelComponent } from '../../label/label.component';
import { AssignableContactComponent } from '../../../../components/add-task/assignable-contact/assignable-contact.component';
import { DialogService } from '../../../services/dialog.service';
import { Contact } from '../../../models/contact';
import { stop } from '../../../ts/global';

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
 * Class representing an assigned-to input component.
 * @extends ReactiveInput
 */
export class AssignedToInputComponent extends ReactiveInput {
  dialog: DialogService = inject(DialogService);

  dialogId: string = 'assignedTo';

  @Input() override control: AbstractControl | null = null;
  @Input() assignedContacts: AbstractControl | null = null;
  @Input('contacts') assignableContacts: Contact[] = [];

  /**
   * Handles a dialog on click.
   * @param event - The event.
   */
  onHandleDialog(event: Event) {
    this.dialog.close('category');
    stop(event);
  }

  /**
   * Gets the css class of an input focus.
   * @returns The css class the input focus.
   */
  getFocusClass() {
    return this.dialog.isOpened(this.dialogId) ? 'focus' : '';
  }

  /**
   * Gets the placeholder.
   * @returns The placeholder.
   */
  getPlaceholder() {
    let opened = this.dialog.isOpened(this.dialogId);
    return !opened ? 'Select contacts to assign' : '';
  }

  /**
   * Opens a drop-down menu.
   */
  onOpenMenu() {
    this.dialog.close('category');
    this.dialog.open(this.dialogId);
  }

  /**
   * Gets the source path of an arrow.
   * @returns The source path of the arrow.
   */
  getArrowSrc() {
    return this.dialog.getArrowSrc(this.dialogId);
  }

  /**
   * Switches a drop-down menu on click.
   */
  onSwitchMenu() {
    this.dialog.switch(this.dialogId);
  }

  /**
   * Gets the css class of a contact list.
   * @returns The css class of the contact list.
   */
  getListClass() {
    return this.dialog.isOpened(this.dialogId) ? 'show' : 'hide';
  }

  /**
   * Verifies a filtered contact.
   * @param name - The contact name.
   * @returns The contact name or a boolean value.
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
   * Assigns a contact on click.
   * @param i - The index of the assignable contact.
   */
  onAssignContact(i: number) {
    this.setContactAssigned(i);
    this.updateAssignedCocntacts();
  }

  /**
   * Sets a contact assigned.
   * @param i - The index of the assignable contact.
   */
  setContactAssigned(i: number) {
    let contact = this.assignableContacts[i];
    let contactAssigned = this.isAssigned(contact);
    !contactAssigned ? this.addContact(contact) : this.removeContact(contact);
  }

  /**
   * Verifies the assigned state of a contact.
   * @param contact - The assignable contact.
   * @returns A boolean value.
   */
  isAssigned(contact: Contact) {
    let assignedContacts: Contact[] = this.getAssignedContactsArray();
    let assigned = assignedContacts.find((c) => c.id == contact.id);
    return assigned ? true : false;
  }

  /**
   * Gets an array of assigned contacts.
   * @returns The array of assigned contacts.
   */
  getAssignedContactsArray() {
    return this.assignedContacts?.value;
  }

  /**
   * Adds an assignable contact to the task.
   * @param contact - The assignable contact.
   */
  addContact(contact: Contact) {
    let assignedContacts = this.getAssignedContactsArray();
    assignedContacts.push(contact);
  }

  /**
   * Removes an assignable contact from the task.
   * @param contact - The assignable contact.
   */
  removeContact(contact: Contact) {
    let assignedContacts = this.getAssignedContactsArray();
    let index = assignedContacts.indexOf(contact);
    if (index > -1) {
      assignedContacts.splice(index, 1);
    }
  }

  /**
   * Updates assigned contacts.
   */
  updateAssignedCocntacts() {
    let assignedContacts = this.getAssignedContacts();
    this.assignedContacts?.setValue(assignedContacts);
  }

  /**
   * Gets assigned contacts.
   * @returns The assigned contacts.
   */
  getAssignedContacts() {
    return this.assignableContacts.filter((c) => this.isAssigned(c));
  }

  /**
   * Verifies assigned contacts.
   * @returns A boolean value.
   */
  isAnyContactAssigned() {
    let assignedContacts = this.getAssignedContactsArray();
    return assignedContacts.length > 0 ? true : false;
  }
}
