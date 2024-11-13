import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})

/**
 * Represents a checkbox.
 */
export class CheckboxComponent {
  checked: boolean = false;
  @Output() check = new EventEmitter<boolean>();

  /**
   * Provides the css class of the checkbox.
   * @returns - The css class to apply.
   */
  getClass() {
    return this.checked ? 'checked' : 'check';
  }

  /**
   * Checks the checkbox on click.
   */
  onCheck() {
    this.checked = !this.checked ? true : false;
    this.check.emit(this.checked);
  }
}
