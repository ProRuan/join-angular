import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a phone formatter service.
 */
export class PhoneFormatterService {
  /**
   * Gets a formatted phone number.
   * @param phone - The phone number.
   * @returns The formatted phone number.
   */
  getFormattedPhone(phone: string): string {
    return !phone.startsWith('+') ? phone : this.getCleanedPhoneNumber(phone);
  }

  /**
   * Gets a cleaned phone number.
   * @param phone - The phone number.
   * @returns The cleaned phone number.
   */
  private getCleanedPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\s+/g, '');
    const match = cleaned.match(/^\+(\d{2})(\d*)$/);
    return !match ? phone : this.getFormattedPhoneNumber(match);
  }

  /**
   * Gets a formatted phone number.
   * @param match - The RegExpMatchArray.
   * @returns The formatted phone number.
   */
  private getFormattedPhoneNumber(match: RegExpMatchArray): string {
    const [countryCode, rest] = [match[1], match[2]];
    const groups = [4, 3, 2, 1];
    const chunks = this.getChunks(rest, groups);
    return `+${countryCode} ${chunks.join(' ')}`.trim();
  }

  /**
   * Gets phone number chunks.
   * @param rest - The phone number rest.
   * @param groups - The phone number groups.
   * @returns The phone number chunks.
   */
  private getChunks(rest: string, groups: number[]): string[] {
    let index = 0;
    const chunks: string[] = [];
    for (const length of groups) {
      if (index >= rest.length) break;
      chunks.push(rest.substring(index, index + length));
      index += length;
    }
    return chunks;
  }
}
