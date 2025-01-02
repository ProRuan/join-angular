import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { AssignableContactComponent } from '../../../components/add-task/assignable-contact/assignable-contact.component';
import { DialogService } from '../../services/dialog.service';
import { Contact } from '../../models/contact';
import { Task } from '../../models/task';
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

  id: string = 'assignedTo';
  assignedContacts: Contact[] = [];
  @Input('task') task: Task = new Task();
  @Input('contacts') assignableContacts: Contact[] = [];
  @Output('assign') contactsChange = new EventEmitter<Contact[]>();

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
    return this.dialog.isOpened(this.id) ? 'focus' : '';
  }

  /**
   * Provides the placeholder.
   * @returns - The placeholder.
   */
  getPlaceholder() {
    let opened = this.dialog.isOpened(this.id);
    return !opened ? 'Select contacts to assign' : '';
  }

  /**
   * Opens the drop-down menu.
   */
  onOpenMenu() {
    this.dialog.close('category');
    this.dialog.open(this.id);
  }

  /**
   * Provides the source path of the arrow.
   * @returns - The source path of the arrow.
   */
  getArrowSrc() {
    return this.dialog.getArrowSrc(this.id);
  }

  /**
   * Switches the drop-down menu on click.
   */
  onSwitchMenu() {
    this.dialog.switch(this.id);
  }

  /**
   * Provides the css class of the contact list.
   * @returns - The css class to apply.
   */
  getListClass() {
    return this.dialog.isOpened(this.id) ? 'show' : '';
  }

  /**
   * Verifies the filtered contact.
   * @param name - The contact name.
   * @returns - A boolean value.
   */
  isFiltered(name: string) {
    name = name.toLowerCase();
    let value = this.value.toLowerCase();
    return name.includes(value);
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
    let contactAssigned = contact.tasks.includes(this.task);
    !contactAssigned ? this.addTask(contact) : this.removeTask(contact);
  }

  /**
   * Adds the task to the assignable contact.
   * @param contact - The assignable contact.
   */
  addTask(contact: Contact) {
    contact.tasks.push(this.task);
  }

  /**
   * Removes the task from the assignable contact.
   * @param contact - The assignable contact.
   */
  removeTask(contact: Contact) {
    let index = contact.tasks.indexOf(this.task);
    if (index > -1) {
      contact.tasks.splice(index, 1);
    }
  }

  /**
   * Updates the assigned contacts.
   */
  updateAssignedCocntacts() {
    this.assignedContacts = this.getAssignedContacts();
    this.contactsChange.emit(this.assignedContacts);
  }

  /**
   * Provides the assigned contacts.
   * @returns - The assigned contacts.
   */
  getAssignedContacts() {
    return this.assignableContacts.filter((c) => c.tasks.includes(this.task));
  }

  /**
   * Verifies assigned contacts.
   * @returns - A boolean value.
   */
  isAnyContactAssigned() {
    return this.assignedContacts.length > 0 ? true : false;
  }
}
