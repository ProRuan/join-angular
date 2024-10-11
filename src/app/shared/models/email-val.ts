/**
 * Represents an email validation.
 */
export class EmailVal {
  result: boolean = false;
  emailPat = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;

  /**
   * Creates an email validation.
   * @param email - The email to validate.
   */
  constructor(email?: string) {
    let result = email?.match(this.emailPat);
    if (result) {
      this.result = true;
    }
  }
}
