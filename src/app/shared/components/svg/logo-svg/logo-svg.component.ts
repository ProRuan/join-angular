import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { JoinService } from '../../../services/join.service';

@Component({
  selector: 'app-logo-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-svg.component.html',
  styleUrl: './logo-svg.component.scss',
})

/**
 * Class representing a logo svg component.
 */
export class LogoSvgComponent {
  join: JoinService = inject(JoinService);

  @Input() changed: boolean = false;

  /**
   * Gets the css class of a svg path.
   * @returns The css class of the svg path.
   */
  getClass() {
    return this.isDarkFill() ? 'dark-fill' : 'white-fill';
  }

  /**
   * Verifies the dark mode of a logo.
   * @returns A boolean value.
   */
  isDarkFill() {
    return this.changed || !this.join.isMobile();
  }
}
