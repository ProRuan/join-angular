import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
})

/**
 * Represents a log component.
 */
export class LogComponent {
  @Input() key: string = '';
  @Input() displayed: boolean = false;

  texts: { [key: string]: any } = {
    signUp: 'You signed up successfully',
    email: 'Email already associated with account',
  };

  /**
   * Provides the css class of the log layer visibility.
   * @returns - The css class to apply.
   */
  getVisClass() {
    return !this.displayed ? 'vis-hidden' : 'vis-visible';
  }

  /**
   * Provides the css class of the log position.
   * @returns - The css class to apply.
   */
  getPosClass() {
    return !this.displayed ? 'pos-hidden' : 'pos-visible';
  }

  /**
   * Prints the log text.
   * @returns - The log text to print.
   */
  printText() {
    return this.texts[this.key];
  }
}
