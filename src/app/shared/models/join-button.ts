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
  constructor(id?: string, text?: string) {
    if (id) {
      this.set(this.buttons[id], text);
    } else {
      this.set(this.buttons['createBtn']);
    }
  }

  /**
   * Sets a join button.
   * @param data - The button data.
   * @param text - The button text.
   */
  set(data: ButtonData, text?: string) {
    this.setProperties(data);
    this.setText(text);
  }

  /**
   * Sets button properties.
   * @param data - The button data.
   */
  setProperties(data: ButtonData) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }
  }

  /**
   * Sets a button text.
   * @param text - The text to set.
   */
  setText(text?: string) {
    if (text) {
      this.text = text;
    }
  }
}
