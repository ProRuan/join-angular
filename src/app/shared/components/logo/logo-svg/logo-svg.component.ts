import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
  @Input() changed: boolean = false;

  /**
   * Gets the css class of a svg path.
   * @returns The css class of the svg path.
   */
  getClass() {
    return this.changed ? 'dark-fill' : 'white-fill';
  }
}
