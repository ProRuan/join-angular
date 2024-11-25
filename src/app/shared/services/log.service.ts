import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a log service.
 */
export class LogService {
  key: string = '';
  logged: boolean = false;

  /**
   * Sets the log.
   * @param logged - A boolean value.
   * @param key - The key of the log text.
   */
  setLog(logged: boolean, key?: string) {
    this.key = key ? key : this.key;
    this.logged = logged;
  }
}
