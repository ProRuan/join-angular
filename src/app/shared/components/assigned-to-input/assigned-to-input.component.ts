import { Component, inject } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AssignedToService } from '../../services/assigned-to.service';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assigned-to-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assigned-to-input.component.html',
  styleUrl: './assigned-to-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, AssignedToInputComponent),
    getProvider(NG_VALUE_ACCESSOR, AssignedToInputComponent),
  ],
})
export class AssignedToInputComponent extends BasicInput {
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

  stop(event: Event) {
    event.stopPropagation();
  }

  logFocus() {
    this.asToData.set(true);
  }

  updateArrowAssignedTo() {
    if (this.asToData.opened) {
      return '../../../assets/img/add-task/drop_down_arrow_up.png';
    } else {
      return '../../../assets/img/add-task/drop_down_arrow_down.png';
    }
  }

  // possible on keydown?!
  filterAC() {
    this.assignableContacts.forEach((contact) => {
      if (contact.name.includes(this.value)) {
        contact.filtered = true;
        // console.log('filtered ac: ', contact);
      } else {
        contact.filtered = false;
        // console.log('hidden ac: ', contact);
      }
    });
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
