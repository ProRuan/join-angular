/**
 * Represents a dash validation.
 */
export class DashVal {
  name: string;
  dashVal = [
    { pattern: /^\-+/, value: '' },
    { pattern: /\-+$/, value: '' },
    { pattern: /\-{2,}/, value: '-' },
  ];

  /**
   * Creates a dash validation.
   * @param name - The name to validate.
   */
  constructor(name: string) {
    this.name = name;
    this.validateDashes();
  }

  /**
   * Provides the result of the dash validation.
   * @returns - The dash-validated name.
   */
  get result() {
    return this.name;
  }

  /**
   * Validates the dashes.
   */
  validateDashes() {
    this.dashVal.forEach((validation) => {
      if (validation.pattern.test(this.name)) {
        this.name = this.name.replace(validation.pattern, validation.value);
      }
    });
  }
}
