/**
 * Represents a password validation.
 */
export class PasswordVal {
  password: string = '';
  lockAhead: string = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])';
  passwordRawPat: string = '[\\dA-Za-z!@#$%^&*]{8,20}$';
  passwordPat: RegExp = new RegExp(this.lockAhead + this.passwordRawPat);

  /**
   * Creates a password validation.
   * @param password - The password to validate.
   */
  constructor(password?: string) {
    let result = password?.match(this.passwordPat);
    if (result) {
      this.password = result[0];
    }
  }
}
