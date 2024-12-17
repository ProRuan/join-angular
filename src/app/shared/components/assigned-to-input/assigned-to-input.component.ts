import { Component, inject } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AssignedToService } from '../../services/assigned-to.service';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { AssignableContactComponent } from '../../../components/add-task/assignable-contact/assignable-contact.component';
import { LabelComponent } from '../label/label.component';
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
export class AssignedToInputComponent extends BasicInput {
  // verify!
  asToData: AssignedToService = inject(AssignedToService);
  catData: CategoryService = inject(CategoryService);

  assignedContacts: any;
  assignableContacts = [
    {
      initials: 'SM',
      name: 'Sofia Müller',
      assigned: false,
      filtered: true,
    },
    {
      initials: 'AS',
      name: 'Anja Schulz',
      assigned: false,
      filtered: true,
    },
    {
      initials: 'EF',
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

  // verify!
  logFocus() {
    this.asToData.set(true);
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

  // verify!!!
  // jsdoc
  getAssignedClass(assigned: boolean) {
    return assigned ? 'assigned' : '';
  }

  switchAssignedTo() {
    if (!this.asToData.opened) {
      this.asToData.set(true);
    } else {
      this.asToData.set(false);
    }
  }

  closeAssignedTo() {
    this.asToData.set(false);
  }

  updateArrowAssignedTo() {
    if (this.asToData.opened) {
      return '../../../assets/img/add-task/drop_down_arrow_up.png';
    } else {
      return '../../../assets/img/add-task/drop_down_arrow_down.png';
    }
  }

  getCheckbox(i: number) {
    return this.assignableContacts[i].assigned ? 'checked' : 'check';
  }

  // use checkbox comp?!
  getCheckSrc(i: number) {
    if (this.assignableContacts[i].assigned) {
      return '../../../assets/img/sign-up/checked.png';
    } else {
      return '../../../assets/img/sign-up/check.png';
    }
  }

  assign(i: number) {
    this.assignableContacts[i].assigned = !this.assignableContacts[i].assigned
      ? true
      : false;
    console.log('assignable contacts: ', this.assignableContacts);

    let contacts = this.assignableContacts.filter(
      (contact) => contact.assigned
    );
    if (contacts) {
      this.assignedContacts = contacts;
    }
    console.log('assigned contacts: ', this.assignedContacts);
  }
}
