import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hint',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hint.component.html',
  styleUrl: './hint.component.scss',
})

/**
 * Represents a hint component.
 */
export class HintComponent {
  @Input() invalid: boolean = false;
  @Input() hint: string = '  This field is required.';

  /**
   * Provides the css class of the hint opacity.
   * @returns - A boolean value.
   */
  getOpacityClass() {
    return this.invalid ? 'o-1' : '';
  }
}
