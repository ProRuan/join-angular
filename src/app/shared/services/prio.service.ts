import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a prio service.
 */
export class PrioService {
  [key: string]: any;
  urgent: boolean = false;
  medium: boolean = true;
  low: boolean = false;
  value: string = 'medium';

  /**
   * Provides the prio button.
   * @param id - The id of the prio button.
   * @returns - A boolean value.
   */
  get(id: string) {
    return this[id];
  }

  /**
   * Sets the prio button.
   * @param id - The id of the prio button.
   */
  set(id: string) {
    this[id] = true;
    this.value = id;
  }

  /**
   * Clears the prio.
   */
  clear() {
    for (const [key] of Object.entries(this)) {
      this[key] = false;
    }
  }

  /**
   * Resets the prio.
   */
  reset() {
    this.clear();
    this.set('medium');
  }
}
