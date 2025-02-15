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
 * Class representing a log component.
 */
export class LogComponent {
  log: LogService = inject(LogService);

  /**
   * Gets a css class of an element.
   * @param element - The element name.
   * @returns The css class of the element.
   */
  getClass(element: string) {
    return this.log.logged ? `${element}-visible` : `${element}-hidden`;
  }
}
