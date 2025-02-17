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
  @Input() title: string = '';
  @Input() subtitle?: string;

  /**
   * Gets the css class of a title container.
   * @returns The css class of the title container.
   */
  getTitleClass() {
    return this.dark ? 'title-cont-dark' : '';
  }

  /**
   * Gets the css class of a text color.
   * @returns The css class of the text color.
   */
  getColorClass() {
    return this.dark ? 'white' : '';
  }

  /**
   * Verifies the dark theme.
   * @param value - A boolean value.
   * @returns A boolean value.
   */
  isDarkTheme(value: boolean = false) {
    return value == this.dark;
  }
}
