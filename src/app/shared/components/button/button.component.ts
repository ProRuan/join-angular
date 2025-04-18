import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { JoinButton } from '../../models/join-button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})

/**
 * Class representing a button component.
 */
export class ButtonComponent {
  @Input() button = new JoinButton();
  @Input() disabled: boolean = false;
  @Input() selected: boolean = false;
  @Input() type: string = 'button';

  /**
   * Gets the css class of a button
   * @returns The css class of the button.
   */
  getClass() {
    return this.isSelected() ? 'contact-settings-btn-selected' : '';
  }

  /**
   * Verifies the selected state of a contact settings button.
   * @returns A boolean value.
   */
  isSelected() {
    return this.button.buttonClass === 'contact-settings-btn' && this.selected;
  }
}
