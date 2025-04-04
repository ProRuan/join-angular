import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a cookie service.
 */
export class CookieService {
  /**
   * Sets a cookie.
   * @param name - The cookie name.
   * @param value - The cookie value.
   * @param days - The storage life as days.
   */
  setCookie(name: string, value: string, days: number) {
    const expiryDate = this.getExpiryDate(days);
    document.cookie = this.getStorableCookie(name, value, expiryDate);
  }

  /**
   * Gets a cookie expiry date.
   * @param days - The storage life as days.
   * @returns The cookie expiry date.
   */
  getExpiryDate(days: number) {
    return new Date(Date.now() + days * 864e5).toUTCString();
  }

  /**
   * Gets a storable cookie.
   * @param name - The cookie name.
   * @param value - The cookie value.
   * @param expiryDate - The cookie expiry date.
   * @returns The storable cookie.
   */
  getStorableCookie(name: string, value: string, expiryDate: string) {
    value = encodeURIComponent(value);
    const settings = this.getCookieSettings();
    return `${name}=${value}; expires=${expiryDate}; ${settings}`;
  }

  /**
   * Gets cookie settings.
   * @returns The cookie settings.
   */
  getCookieSettings() {
    return 'path=/; Secure; SameSite=Strict';
  }

  /**
   * Gets a cookie.
   * @param name - The cookie name.
   * @returns The cookie.
   */
  getCookie(name: string) {
    const cookies = this.getStoredCookie(name);
    return cookies ? decodeURIComponent(cookies.split('=')[1]) : null;
  }

  /**
   * Gets a stored cookie by cookie name.
   * @param name - The cookie name.
   * @returns The stored cookie.
   */
  getStoredCookie(name: string) {
    const cookieSplit = document.cookie.split('; ');
    return cookieSplit.find((row) => row.startsWith(name + '='));
  }

  /**
   * Deletes a cookie.
   * @param name - The cookie name.
   */
  deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }
}
