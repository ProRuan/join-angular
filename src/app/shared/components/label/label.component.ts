import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
})

/**
 * Class representing a label component.
 */
export class LabelComponent {
  @Input() text: string = '';
  @Input() req: boolean = false;
  target: string = '';

  /**
   * Gets an input name.
   * @returns The input name.
   */
  getInputName() {
    return this.text.toLowerCase().replaceAll(' ', '-');
  }
}
