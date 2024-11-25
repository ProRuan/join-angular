import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LogService } from '../../services/log.service';

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
  log: LogService = inject(LogService);

  texts: { [key: string]: any } = {
    signUp: 'You signed up successfully',
    email: 'Email already associated with account',
    newPassword: 'Password updated successfully',
  };

  /**
   * Provides the css class.
   * @param prop - The property name.
   * @returns - The css class to apply.
   */
  getClass(prop: string) {
    return !this.log.logged ? `${prop}-hidden` : `${prop}-visible`;
  }

  /**
   * Prints the log text.
   * @returns - The log text to print.
   */
  printText() {
    return this.texts[this.log.key];
  }
}
