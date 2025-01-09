import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { Contact } from '../../../shared/models/contact';

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
  @Input() assigned: boolean = false;

  /**
   * Provides the css class of the assignable contact.
   * @returns - The css class to apply.
   */
  getClass() {
    return this.assigned ? 'assigned' : '';
  }
}
