import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainLink } from '../../../interfaces/main-link';

@Component({
  selector: 'app-main-link',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main-link.component.html',
  styleUrl: './main-link.component.scss',
})

/**
 * Represents a main link component.
 */
export class MainLinkComponent {
  @Input() link: MainLink = {
    img: 'summary_icon',
    text: 'Summary',
    active: true,
  };

  /**
   * Provides the main link.
   * @returns - The main link.
   */
  getLink() {
    let id = this.link.text.toLowerCase();
    return id.includes(' ') ? id.replace(' ', '-') : id;
  }

  /**
   * Verifies the disabled state of the main link.
   * @returns - A boolean value.
   */
  isDisabled() {
    return this.link.active ? true : false;
  }

  /**
   * Provides the source path.
   * @returns - The source path.
   */
  getPath() {
    return `./assets/img/menu/${this.link.img}.png`;
  }
}
