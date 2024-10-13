import { CheckItem } from '../interfaces/check-item';

/**
 * Represents a password validation.
 */
export class PasswordVal {
  lockAhead: string = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])';
  expected: string = '[\\dA-Za-z!@#$%^&*]{8,20}';
  passwordPat: RegExp;
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
  password: string = '';

  /**
   * Creates a password validation.
   * @param password - The password to validate.
   */
  constructor(password?: string) {
    this.passwordPat = this.getPasswordPat();
    if (password) {
      this.validatePassword(password);
      if (this.result) {
        let result = password.match(this.passwordPat);
        if (result) {
          this.password = result[0];
        }
      }
    }
  }

  getPasswordPat() {
    let regExp = this.lockAhead + this.expected;
    return new RegExp(regExp);
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
