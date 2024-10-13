/**
 * Represents a name validation.
 */
export class NameVal {
  [key: string]: any;
  fullName: string = '';
  name: string = '';
  initials: string = '';
  nameRawPat: string = '(([A-Za-z])[A-Za-z]+(?:\\-[A-Za-z]{2,})?)';
  namePat: RegExp = new RegExp(`${this.nameRawPat}(?:\\s${this.nameRawPat})*`);

  /**
   * Creates a name validation.
   * @param name - The name to validate.
   */
  constructor(name?: string) {
    let result = name?.match(this.namePat);
    if (result) {
      this.setFullName(result);
      this.setName(result);
      this.setInitials(result);
    }
  }

  /**
   * Sets the full name.
   * @param result - The RegExpMatchArray.
   */
  setFullName(result: RegExpMatchArray) {
    let fullName = result[0];
    this.formatFullName(fullName);
  }

  /**
   * Formats the full name.
   * @param fullName - The full name.
   */
  formatFullName(fullName: string) {
    let names = fullName.split(' ');
    this.formatNames(names);
  }

  /**
   * Formats the names.
   * @param names - The names.
   */
  formatNames(names: string[]) {
    names.forEach((name, i) => {
      name = this.getName(name);
      this.rewriteFullName(name, i);
    });
  }

  /**
   * Provides the name.
   * @param name - The name.
   * @returns - The name.
   */
  getName(name: string) {
    if (name.includes('-')) {
      return this.getFormattedDoubleName(name);
    } else {
      return this.getFormattedName(name);
    }
  }

  /**
   * Provides the formatted double name.
   * @param name - The name.
   * @returns - The formatted double name.
   */
  getFormattedDoubleName(name: string) {
    let doubleName = name.split('-');
    this.formatDoubleName(doubleName);
    return this.getRewrittenName(name, doubleName);
  }

  /**
   * Formats the double name.
   * @param doubleName - The double name.
   */
  formatDoubleName(doubleName: string[]) {
    doubleName.forEach((singleName, i) => {
      doubleName[i] = this.getFormattedName(singleName);
    });
  }

  /**
   * Provides the formatted name.
   * @param name - The name.
   * @returns - The formatted name.
   */
  getFormattedName(name: string) {
    name = name.toLowerCase();
    let initial = name[0];
    return name.replace(initial, initial.toUpperCase());
  }

  /**
   * Provides the rewritten name.
   * @param name - The name.
   * @param doubleName - The double name.
   * @returns - The rewritten name.
   */
  getRewrittenName(name: string, doubleName: string[]) {
    doubleName.forEach((singleName, i) => {
      i == 0 ? (name = singleName) : (name += `-${singleName}`);
    });
    return name;
  }

  /**
   * Rewrites the full name.
   * @param name - The name.
   * @param i - The index of the name.
   */
  rewriteFullName(name: string, i: number) {
    i == 0 ? (this.fullName = name) : (this.fullName += ` ${name}`);
  }

  /**
   * Sets the name.
   * @param result - The RegExpMatchArray.
   */
  setName(result: RegExpMatchArray) {
    let firstName = this.getName(result[1]);
    this.name = firstName;
    if (result[3]) {
      let lastName = this.getName(result[3]);
      this.name += ` ${lastName}`;
    }
  }

  /**
   * Sets the initals.
   * @param result - The RegExpMatchArray.
   */
  setInitials(result: RegExpMatchArray) {
    let firstInitial = this.getFormattedName(result[2]);
    this.initials = firstInitial;
    if (result[4]) {
      let lastInitial = this.getFormattedName(result[4]);
      this.initials += lastInitial;
    }
  }

  /**
   * Provides the result of the name validation.
   * @returns - The result of the name validation.
   */
  getResult() {
    return {
      fullName: this.fullName,
      name: this.name,
      initials: this.initials,
    };
  }
}
