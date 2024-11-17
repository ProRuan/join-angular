/**
 * Represents a user.
 */
export class User {
  initials: string;
  name: string;
  email: string;
  password: string;

  /**
   * Creates a user.
   * @param data - The user data.
   */
  constructor(data: any) {
    this.initials = data.initials;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}
