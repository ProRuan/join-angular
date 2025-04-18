import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})

/**
 * Class representing a checkbox.
 */
export class CheckboxComponent {
  @Input() checked: boolean = false;
  @Input() bright: boolean = false;
  @Output() check = new EventEmitter<boolean>();

  /**
   * Gets the css class of the checkbox.
   * @returns The css class of the checkbox.
   */
  getClass() {
    if (this.checked && this.bright) return 'checked-white';
    else if (this.checked) return 'checked';
    else return 'check';
  }

  /**
   * Checks the checkbox on click.
   */
  onCheck() {
    this.checked = !this.checked;
    this.check.emit(this.checked);
  }
}
