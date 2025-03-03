import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { backLogAnimation } from '../../animations/backlog/back-log.animation';

@Component({
  selector: 'app-back-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-log.component.html',
  styleUrl: './back-log.component.scss',
  animations: [backLogAnimation],
})

/**
 * Class representing a back log component.
 */
export class BackLogComponent {
  @Input() displayed: boolean = false;
  @Input() text: string = 'Back log text';
  @Input() img?: string;

  /**
   * Gets a source path.
   * @returns The source path.
   */
  getSrc() {
    return `/assets/img/menu/${this.img}.png`;
  }
}
