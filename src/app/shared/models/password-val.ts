import { CheckItem } from '../interfaces/check-item';

/**
 * Represents a password validation.
 */
export class PasswordVal {
  passwordPat: RegExp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;
  checklist: CheckItem[] = [
    {
      item: 'digit',
      pattern: /[0-9]/,
    },
    {
      item: 'lower-case character',
      pattern: /[a-z]/,
    },
    {
      item: 'upper-case character',
      pattern: /[A-Z]/,
    },
    {
      item: 'special character',
      pattern: /[!@#$%^&*]/,
    },
  ];
  result: boolean = true;

  /**
   * Creates a password validation.
   * @param password - The password to validate.
   */
  constructor(password?: string) {
    if (password) {
      this.validatePassword(password);
    }
  }

  /**
   * Validates the password.
   * @param password - The password.
   */
  validatePassword(password: string) {
    for (let i = 0; i < this.checklist.length; i++) {
      let item = this.checklist[i];
      if (!item.pattern.test(password)) {
        this.result = false;
        break;
      }
    }
  }
}
