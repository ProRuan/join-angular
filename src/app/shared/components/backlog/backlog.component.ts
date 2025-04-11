import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss',
})

/**
 * Class representing a backlog component.
 */
export class BacklogComponent {
  @Input() text: string = '';
  @Input() img?: string;

  /**
   * Gets a source path.
   * @returns The source path.
   */
  getSrc() {
    return `/assets/img/menu/${this.img}.png`;
  }
}
