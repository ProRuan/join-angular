import { inject, Injectable } from '@angular/core';
import { InputConfigurationService } from './input-configuration.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a password mask service.
 */
export class PasswordMaskService {
  configurator: InputConfigurationService = inject(InputConfigurationService);

  charSet: Set<string> = this.configurator.input['password'].charSet;
  allowedKeys: string[] = this.configurator.allowedKeys;
  circle: string = '\u25CF';

  /**
   * Provides the pressed key.
   * @param event - The KeyboardEvent.
   * @returns - The pressed key.
   */
  getKey(event: KeyboardEvent) {
    return event.key.toLowerCase();
  }

  /**
   * Verifies the keyboard event to disallow.
   * @param event - The KeyboardEvent.
   * @param key - The pressed key.
   * @returns - A boolean value.
   */
  isDisallowedKeyboardEvent(event: KeyboardEvent, key: string) {
    let keyDisallowed = this.isDisallowedKey(key);
    let keyCombDisallowed = this.isDisallowedKeyComb(event, key);
    return keyDisallowed || keyCombDisallowed;
  }

  /**
   * Verifies the key to disallow.
   * @param key - The pressed key.
   * @returns - A boolean value.
   */
  isDisallowedKey(key: string) {
    let charAllowed = this.charSet.has(key);
    let keyAllowed = this.allowedKeys.includes(key);
    return !charAllowed && !keyAllowed;
  }

  /**
   * Verifies the key combination to disallow.
   * @param event - The KeyboardEvent.
   * @param key - The pressed key.
   * @returns - A boolean value.
   */
  isDisallowedKeyComb(event: KeyboardEvent, key: string) {
    let ctrlF = this.isModifiedKey(event, key, 'f');
    let ctrlG = this.isModifiedKey(event, key, 'g');
    return ctrlF || ctrlG;
  }

  /**
   * Verifies the modified key.
   * @param event - The KeyboardEvent.
   * @param key - The pressed key.
   * @param matchKey - The key to match.
   * @returns - A boolean value.
   */
  isModifiedKey(event: KeyboardEvent, key: string, matchKey: string) {
    return event.ctrlKey && key == matchKey;
  }

  /**
   * Verifies the changing key.
   * @param event - The KeyboardEvent.
   * @param key - The pressed key.
   * @returns - A boolean value.
   */
  isChangingKey(event: KeyboardEvent, key: string) {
    let keyAllowed = this.isAllowedKey(event, key);
    let atPressed = this.isAtPressed(event, key);
    let textEdited = this.isEditingKey(event, key);
    let deletingKey = this.isDeletingKey(key);
    return keyAllowed || atPressed || textEdited || deletingKey;
  }

  /**
   * Verifies the key to allow.
   * @param event - The KeyboardEvent.
   * @param key - The pressed key.
   * @returns - A boolean value.
   */
  isAllowedKey(event: KeyboardEvent, key: string) {
    let keyAllowed = this.charSet.has(key);
    let ctrlState = event.ctrlKey;
    let altState = event.altKey;
    let altGraphState = event.getModifierState('AltGraph');
    return keyAllowed && !ctrlState && !altState && !altGraphState;
  }

  /**
   * Verifies the at key.
   * @param event - The KeyboardEvent.
   * @param key - The pressed key.
   * @returns - A boolean value.
   */
  isAtPressed(event: KeyboardEvent, key: string) {
    let ctrlAltAt = event.ctrlKey && event.altKey && key == '@';
    let altGraphAt = event.getModifierState('AltGraph') && key == '@';
    return ctrlAltAt || altGraphAt;
  }

  /**
   * Verifies the editing key.
   * @param event - The KeyboardEvent.
   * @param key - The pressed key.
   * @returns - A boolean value.
   */
  isEditingKey(event: KeyboardEvent, key: string) {
    return event.ctrlKey && (key == 'v' || key == 'y' || key == 'z');
  }

  /**
   * Verifies the deleting key.
   * @param key - The pressed key.
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
   * Verifies the doing key.
   * @param event - The KeyboardEvent.
   * @param key - The pressed key.
   * @returns - A boolean value.
   */
  isDoingKeyComb(event: KeyboardEvent, key: string) {
    let ctrlY = this.isModifiedKey(event, key, 'y');
    let ctrlZ = this.isModifiedKey(event, key, 'z');
    return ctrlY || ctrlZ;
  }

  /**
   * Provides the mask.
   * @param key - The pressed key.
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
   * @param key - The pressed key.
   * @param i - The index of the char.
   * @param cursorPos - The cursor position.
   * @returns - A boolean value.
   */
  isMaskedChar(key: string, i: number, cursorPos: number) {
    return i != cursorPos || this.isDeletingKey(key);
  }

  /**
   * Provides the complete mask.
   * @param mask - The mask to complete.
   * @param cursorPos - The cursor position.
   * @returns - The complete mask.
   */
  getCompleteMask(mask: string, cursorPos: number) {
    return mask.replace(mask[cursorPos], this.circle);
  }
}
