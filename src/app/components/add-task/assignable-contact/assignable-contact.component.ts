import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';

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
  @Input() contact = {
    initials: 'SM',
    bgc: 'cyan',
    name: 'Sofia Müller',
    assigned: false,
    filtered: true,
  };

  /**
   * Provides the css class of the assignable contact.
   * @returns - The css class to apply.
   */
  getClass() {
    return this.contact.assigned ? 'assigned' : '';
  }
}
