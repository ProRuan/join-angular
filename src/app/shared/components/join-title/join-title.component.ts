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
 * Represents a join title component.
 */
export class JoinTitleComponent {
  @Input() dark: boolean = false;
  @Input() title: string = '';
  @Input() subtitle?: string;

  /**
   * Provides the css class of the title container.
   * @returns - The css class to apply.
   */
  getTitleClass() {
    return this.dark ? 'title-cont-dark' : '';
  }

  /**
   * Provides the css class of the text color.
   * @returns - The css class to apply.
   */
  getColorClass() {
    return this.dark ? 'white' : '';
  }

  /**
   * Verifies the dark theme.
   * @param value - A boolean value.
   * @returns - A boolean value.
   */
  isDarkTheme(value: boolean = false) {
    return value == this.dark;
  }
}
