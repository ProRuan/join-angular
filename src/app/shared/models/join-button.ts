import { inject } from '@angular/core';
import { ButtonData } from '../interfaces/button-data';
import { ButtonDataService } from '../services/button-data.service';

/**
 * Class representing a join button.
 */
export class JoinButton {
  buttons: ButtonDataService = inject(ButtonDataService);

  [key: string]: any;
  buttonClass: string = '';
  textClass: string = '';
  text: string = '';
  imgClass: string = '';
  src: string = '';
  alt: string = '';

  /**
   * Creates a join button.
   * @param id - The button id.
   */
  constructor(id?: string) {
    if (id) {
      this.set(this.buttons[id]);
    } else {
      this.set(this.buttons['createBtn']);
    }
  }

  /**
   * Sets a join button.
   * @param data - The button data.
   */
  set(data: ButtonData) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }
  }
}
