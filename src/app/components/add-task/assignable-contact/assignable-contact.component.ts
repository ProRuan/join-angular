import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { Contact } from '../../../shared/models/contact';
import { Task } from '../../../shared/models/task';
import { isExistent } from '../../../shared/ts/global';

@Component({
  selector: 'app-assignable-contact',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  templateUrl: './assignable-contact.component.html',
  styleUrl: './assignable-contact.component.scss',
})

/**
 * Represents an assignable contact component.
 */
export class AssignableContactComponent {
  @Input() contact: Contact = new Contact();

  /**
   * Provides the css class of the assignable contact.
   * @returns - The css class to apply.
   */
  getClass() {
    let task = this.isAssigned();
    return task ? 'assigned' : '';
  }

  /**
   * Verifies the assigned state of the contact.
   * @returns - A boolean value.
   */
  isAssigned() {
    let task = this.contact.tasks.find((t) => this.isIncluded(t));
    return isExistent(task);
  }

  /**
   * Verifies the assigned state of of the contact.
   * @param task - The task to assign.
   * @returns - A boolean value.
   */
  isIncluded(task: Task) {
    return task.assignedTo.includes(this.contact);
  }
}
