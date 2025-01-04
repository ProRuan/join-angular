import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { Contact } from '../../../shared/models/contact';
import { Task } from '../../../shared/models/task';

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
  @Input() task: Task = new Task();
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
    let contact = this.task.assignedTo.find((c) => c === this.contact);
    return contact ? true : false;
  }
}
