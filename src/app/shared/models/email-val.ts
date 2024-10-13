/**
 * Represents an email validation.
 */
export class EmailVal {
  email: string = '';
  emailRawPat: string = '[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}';
  emailPat: RegExp = new RegExp(this.emailRawPat);

  /**
   * Creates an email validation.
   * @param email - The email to validate.
   */
  constructor(email?: string) {
    let result = email?.match(this.emailPat);
    if (result) {
      this.email = result[0];
    }
  }
}
