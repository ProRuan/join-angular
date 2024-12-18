import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { AssignableContactComponent } from '../../../components/add-task/assignable-contact/assignable-contact.component';
import { DialogService } from '../../services/dialog.service';
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

  // update category dialog!
  // verify --> use user contacts!!!
  assignedContacts: any;
  assignableContacts = [
    {
      initials: 'SM',
      bgc: 'cyan',
      name: 'Sofia Müller',
      assigned: false,
      filtered: true,
    },
    {
      initials: 'AS',
      bgc: 'purple',
      name: 'Anja Schulz',
      assigned: false,
      filtered: true,
    },
    {
      initials: 'EF',
      bgc: 'yellow',
      name: 'Eva Fischer',
      assigned: false,
      filtered: true,
    },
  ];

  /**
   * Stops the event on click.
   * @param event - The event.
   */
  onStop(event: Event) {
    stop(event);
  }

  /**
   * Opens the drop-down menu.
   */
  onOpenMenu() {
    this.dialog.close('category');
    this.dialog.open('assignedTo');
  }

  /**
   * Filters the assignable contacts on keyup.
   */
  onFilter() {
    let value = this.value.toLowerCase();
    this.assignableContacts.forEach((contact) => {
      let name = contact.name.toLowerCase();
      contact.filtered = name.includes(value) ? true : false;
    });
  }

  /**
   * Provides the source path of the arrow.
   * @returns - The source path of the arrow.
   */
  getArrowSrc() {
    if (this.dialog.isOpened(this.id)) {
      return '/assets/img/add-task/drop_down_arrow_up.png';
    } else {
      return '/assets/img/add-task/drop_down_arrow_down.png';
    }
  }

  /**
   * Switches the drop-down menu on click.
   */
  onSwitchMenu() {
    if (!this.dialog.isOpened(this.id)) {
      this.dialog.open(this.id);
    } else {
      this.dialog.close(this.id);
    }
  }

  /**
   * Provides the css class of the contact list.
   * @returns - The css class to apply.
   */
  getListClass() {
    return this.dialog.isOpened(this.id) ? 'show' : '';
  }

  /**
   * Assigns the contact on click.
   * @param i - The index of the assignable contact.
   */
  onAssign(i: number) {
    this.setContactAssigned(i);
    this.updateAssignedContacts();
  }

  /**
   * Sets the contact assigned.
   * @param i - The index of the assignable contact.
   */
  setContactAssigned(i: number) {
    let contact = this.assignableContacts[i];
    contact.assigned = !contact.assigned ? true : false;
  }

  /**
   * Updates the assigned contacts.
   */
  updateAssignedContacts() {
    let contacts = this.assignableContacts.filter((c) => c.assigned);
    if (contacts) {
      this.assignedContacts = contacts;
    }
  }
}
