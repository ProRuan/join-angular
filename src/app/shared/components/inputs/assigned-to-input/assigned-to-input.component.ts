import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { LabelComponent } from '../../label/label.component';
import { CheckboxComponent } from '../../checkbox/checkbox.component';
import { JoinService } from '../../../services/join.service';
import { DialogService } from '../../../services/dialog.service';
import { Contact } from '../../../models/contact';
import { getCurrentValue, stopPropagation } from '../../../ts/global';

@Component({
  selector: 'app-assigned-to-input',
  standalone: true,
  imports: [CommonModule, LabelComponent, CheckboxComponent],
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
 * @implements {OnChanges}
 */
export class AssignedToInputComponent
  extends ReactiveInput
  implements OnChanges
{
  join: JoinService = inject(JoinService);
  dialogs: DialogService = inject(DialogService);

  dialogId: string = 'assignedTo';
  assignableContacts: Contact[] = [];

  @Input() override control: AbstractControl | null = null;
  @Input('assignedContacts') taskControl: AbstractControl | null = null;
  @Input() contacts: Contact[] = [];

  /**
   * Gets assigned contacts.
   * @returns The assigned contacts.
   */
  get assignedContacts() {
    return this.taskControl?.value;
  }

  /**
   * Sets assigned contacts.
   * @param contacts - The contacts to set.
   */
  set assignedContacts(contacts: Contact[]) {
    this.taskControl?.setValue(contacts);
  }

  /**
   * Marks an input as dirty on change.
   */
  override onChange() {
    this.markAsDirty(this.taskControl);
  }

  /**
   * Updates an assigned-to input component on changes.
   * @param changes - The changes.
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.updateAssignableContacts(changes);
    this.updateAssignedContacts();
  }

  /**
   * Updates assignable contacts.
   * @param changes - The changes.
   */
  updateAssignableContacts(changes: SimpleChanges) {
    let contact = this.join.user.getContact();
    let contacts = getCurrentValue<Contact[]>(changes, 'contacts');
    this.assignableContacts = [contact, ...contacts];
  }

  /**
   * Updates assigned contacts.
   */
  updateAssignedContacts() {
    this.assignedContacts = this.getAssignedContacts();
  }

  /**
   * Gets assigned contacts.
   * @returns The assigned contacts.
   */
  getAssignedContacts() {
    return this.assignableContacts.filter((c) => this.isAssigned(c));
  }

  /**
   * Verifies the assigned state of a contact.
   * @param contact - The assignable contact.
   * @returns A boolean value.
   */
  isAssigned(contact: Contact) {
    return !!this.assignedContacts.find((c) => c.id === contact.id);
  }

  /**
   * Handles a dialog on click.
   * @param event - The event.
   */
  onHandle(event: Event) {
    this.dialogs.close('category');
    stopPropagation(event);
  }

  /**
   * Gets the css class of an input focus.
   * @returns The css class the input focus.
   */
  getFocusClass() {
    return this.dialogs.isOpened(this.dialogId) ? 'focus' : '';
  }

  /**
   * Gets the placeholder.
   * @returns The placeholder.
   */
  getPlaceholder() {
    let opened = this.dialogs.isOpened(this.dialogId);
    return !opened ? 'Select contacts to assign' : '';
  }

  /**
   * Opens a drop-down menu.
   */
  onOpen() {
    this.dialogs.close('category');
    this.dialogs.open(this.dialogId);
  }

  /**
   * Gets the source path of an arrow.
   * @returns The source path of the arrow.
   */
  getArrowSrc() {
    return this.dialogs.getArrowSrc(this.dialogId);
  }

  /**
   * Switches a drop-down menu on click.
   */
  onSwitch() {
    this.dialogs.switch(this.dialogId);
  }

  /**
   * Gets the css class of a contact list.
   * @returns The css class of the contact list.
   */
  getListClass() {
    return this.dialogs.isOpened(this.dialogId) ? 'show' : 'hide';
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
   * Gets the css class of an assignable contact.
   * @param contact - The assignable contact.
   * @returns The css class of the assignable contact.
   */
  getBgcClass(contact: Contact) {
    let assigned = this.isAssigned(contact);
    return assigned ? 'assigned' : '';
  }

  /**
   * Assigns a contact on click.
   * @param i - The index of the assignable contact.
   */
  onAssign(i: number) {
    this.setContactAssigned(i);
    this.updateAssignedContacts();
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
   * Adds an assignable contact to the task.
   * @param contact - The assignable contact.
   */
  addContact(contact: Contact) {
    this.assignedContacts.push(contact);
    this.markAsDirty(this.taskControl);
  }

  /**
   * Removes an assignable contact from the task.
   * @param contact - The assignable contact.
   */
  removeContact(contact: Contact) {
    let index = this.assignedContacts.indexOf(contact);
    if (index > -1) {
      this.assignedContacts.splice(index, 1);
    }
  }

  /**
   * Verifies assigned contacts.
   * @returns A boolean value.
   */
  isAnyContactAssigned() {
    return this.assignedContacts.length > 0;
  }
}
