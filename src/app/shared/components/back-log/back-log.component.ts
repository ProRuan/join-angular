import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { fadeAnimation } from '../../animations/fade-animation';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-back-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-log.component.html',
  styleUrl: './back-log.component.scss',
  animations: [fadeAnimation],
})

/**
 * Class representing a back log component.
 */
export class BackLogComponent {
  dialogs: DialogService = inject(DialogService);

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
