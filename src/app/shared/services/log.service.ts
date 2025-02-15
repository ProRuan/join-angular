import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a log service.
 */
export class LogService {
  text: string = '';
  logged: boolean = false;

  /**
   * Sets the log.
   * @param logged - A boolean value.
   * @param text - The text to set.
   */
  setLog(logged: boolean, text?: string) {
    this.setText(text);
    this.logged = logged;
  }

  /**
   * Sets the log text.
   * @param text - The text to set.
   */
  setText(text?: string) {
    this.text = text ?? this.text;
  }
}
