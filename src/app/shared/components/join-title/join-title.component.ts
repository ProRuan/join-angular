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
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() mobile: boolean = false;
  @Input() dark: boolean = false;

  /**
   * Gets the css class of a title container.
   * @returns The css class of the title container.
   */
  getTitleClass() {
    return this.mobile ? 'mobile-title-cont' : '';
  }

  /**
   * Gets the css class of a text color.
   * @returns The css class of the text color.
   */
  getColorClass() {
    if (this.dark) return 'white';
    else if (this.mobile) return 'black';
    else return '';
  }

  /**
   * Verifies the display state of an alternative border.
   * @returns A boolean value.
   */
  isAlternativeBorder() {
    return (this.mobile && this.subtitle) || this.dark;
  }
}
