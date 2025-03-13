import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a session id service.
 */
export class SessionIdService {
  sessionId: string = '';
  charCodes: string[] = [];

  /**
   * Creates a session id.
   */
  constructor() {
    this.setCharCodes();
  }

  /**
   * Gets a session id.
   * @returns The session id.
   */
  get() {
    this.sessionId = '';
    this.createSessionId();
    return this.sessionId;
  }

  /**
   * Sets char codes.
   */
  setCharCodes() {
    this.addCharCodeGroup(48, 10);
    this.addCharCodeGroup(65, 26);
    this.addCharCodeGroup(97, 26);
  }

  /**
   * Adds a char code group.
   * @param a - The start code.
   * @param n - The number of codes.
   */
  addCharCodeGroup(a: number, n: number) {
    for (let i = a; i < a + n; i++) {
      this.charCodes.push(String.fromCharCode(i));
    }
  }

  /**
   * Creates a session id.
   */
  createSessionId() {
    for (let i = 0; i < 20; i++) {
      let index = this.getRandomIndex(i);
      this.sessionId += this.charCodes[index];
    }
  }

  /**
   * Gets a random index.
   * @param i - The index of the session id.
   * @returns A random index.
   */
  getRandomIndex(i: number) {
    if (i != 0) {
      return Math.round(Math.random() * 61);
    } else {
      return Math.round(1 + Math.random() * 60);
    }
  }
}
