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
   * Gets the css class of a button background color.
   * @returns The css class of button background color.
   */
  getBgcClass() {
    if (this.isSettingsButtonSelected()) {
      return 'bgc-gray';
    } else {
      return '';
    }
  }

  /**
   * Gets the css class of a button text.
   * @returns The css class of the button text.
   */
  getTextClass() {
    if (this.isSettingsButtonSelected()) {
      return 'settings-btn-text-selected';
    } else {
      return this.button.textClass;
    }
  }

  /**
   * Verifies the selected state of a settings button.
   * @returns A boolean value.
   */
  isSettingsButtonSelected() {
    let editBtnSelected = this.isButtonSelected('Edit');
    let deleteBtnSelected = this.isButtonSelected('Delete');
    return editBtnSelected || deleteBtnSelected;
  }

  /**
   * Verifies the selected state of a button.
   * @param text - The button text.
   * @returns A boolean value.
   */
  isButtonSelected(text: string) {
    return this.button.text === text && this.selected;
  }

  /**
   * Gets the css class of a button image.
   * @returns The css class of the button image.
   */
  getImageClass() {
    if (this.isButtonSelected('Edit')) {
      return 'edit-selected';
    } else if (this.isButtonSelected('Delete')) {
      return 'delete-selected';
    } else {
      return this.button.imgClass;
    }
  }
}
