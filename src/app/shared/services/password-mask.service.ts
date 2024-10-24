import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a password mask service.
 */
export class PasswordMaskService {
  chars: string = 'abcdefghijklmnopqrstuvwxyzäöüß';
  digits: string = '0123456789';
  special: string = '!@#$%^&*';
  charSet: Set<string> = new Set();
  allowedKeys: string[] = [
    'home',
    'end',
    'insert',
    'delete',
    'backspace',
    'tab',
    'capslock',
    'shift',
    'control',
    'meta',
    'alt',
    'altgraph',
    'arrowleft',
    'arrowright',
  ];
  circle: string = '\u25CF';

  /**
   * Creates a password mask service.
   */
  constructor() {
    this.setCharSet();
  }

  /**
   * Sets the char set to apply.
   */
  setCharSet() {
    let allowedChars = this.getAllowedChars();
    this.charSet = new Set(allowedChars);
  }

  /**
   * Provides the allowed chars.
   * @returns - The allowed chars.
   */
  getAllowedChars() {
    return this.chars + this.digits + this.special;
  }

  /**
   * Provides the key.
   * @param event - The occurring event.
   * @returns - The key.
   */
  getKey(event: KeyboardEvent) {
    return event.key.toLowerCase();
  }

  /**
   * Verifies the disallowed key.
   * @param key - The key to verify.
   * @returns - A boolean value.
   */
  isDisallowedKey(key: string) {
    let charAllowed = this.charSet.has(key);
    let keyAllowed = this.allowedKeys.includes(key);
    return !charAllowed && !keyAllowed;
  }

  /**
   * Verifies the changing key.
   * @param key - The key to verify.
   * @returns - A boolean value.
   */
  isChangingKey(key: string) {
    let allowedKey = this.charSet.has(key);
    return allowedKey || this.isDeletingKey(key);
  }

  /**
   * Verifies the deleting key.
   * @param key - The key to verify.
   * @returns - A boolean value.
   */
  isDeletingKey(key: string) {
    return key == 'backspace' || key == 'delete';
  }

  /**
   * Provides the cursor position.
   * @param event - The occurring event.
   * @returns - The cursor position.
   */
  getCursorPos(event: Event) {
    let input = event.target as HTMLInputElement;
    let cursorPos = input.selectionStart;
    return cursorPos ? cursorPos : 0;
  }

  /**
   * Provides the mask.
   * @param key - The key to process.
   * @param value  - The password value.
   * @param cursorPos - The cursor position.
   * @returns - The mask.
   */
  getMask(key: string, value: string, cursorPos: number) {
    let mask = '';
    let recentChar = value[cursorPos];
    for (let i = 0; i < value.length; i++) {
      mask += this.isMaskedChar(key, i, cursorPos) ? this.circle : recentChar;
    }
    return mask;
  }

  /**
   * Verifies the char to mask.
   * @param key - The key to process.
   * @param i - The index of the char.
   * @param cursorPos - The cursor position.
   * @returns - A boolean value.
   */
  isMaskedChar(key: string, i: number, cursorPos: number) {
    return i != cursorPos || this.isDeletingKey(key);
  }

  /**
   * Provides the final mask.
   * @param mask - The mask to complete.
   * @param cursorPos - The cursor position.
   * @returns - The final mask.
   */
  getFinalMask(mask: string, cursorPos: number) {
    return mask.replace(mask[cursorPos], this.circle);
  }
}
