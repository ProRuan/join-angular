import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-join-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './join-title.component.html',
  styleUrl: './join-title.component.scss',
})

/**
 * Class representing a join title component.
 */
export class JoinTitleComponent {
  @Input() dark: boolean = false;
  @Input() mobile: boolean = false;
  @Input() title: string = '';
  @Input() subtitle?: string;

  /**
   * Gets the css class of a title container.
   * @returns The css class of the title container.
   */
  getTitleClass() {
    return this.dark || this.mobile ? 'title-cont-dark' : '';
  }

  /**
   * Gets the css class of a text color.
   * @returns The css class of the text color.
   */
  getColorClass() {
    if (this.mobile) return 'black';
    else if (this.dark) return 'white';
    else return '';
  }

  /**
   * Verifies the state of a dark theme.
   * @param value - The value to verify.
   * @returns A boolean value.
   */
  isDarkTheme(value: boolean = false) {
    return value == this.dark;
  }
}
