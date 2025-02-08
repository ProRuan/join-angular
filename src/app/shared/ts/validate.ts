const digit = '0-9';
const upperCase = 'A-ZÀ-Ÿ';
const lowerCase = 'a-zà-ÿß';
const letter = lowerCase;
const specialChar = '!@#$%^&*';

// rename to pattern.ts?!

/**
 * Gets the name pattern.
 * @returns The name pattern.
 */
function getNamePattern(): RegExp {
  const singleName = getSingleNamePattern();
  const doubleName = getDoubleNamePattern(singleName);
  const fullName = getFullNamePattern(doubleName);
  return new RegExp(`^${fullName}$`, 'i');
}

/**
 * Gets the single name pattern.
 * @returns The single name pattern.
 */
function getSingleNamePattern() {
  return `([${letter}]{2,})`;
}

/**
 * Gets the double name pattern.
 * @param singleName - The single name pattern.
 * @returns The double name pattern.
 */
function getDoubleNamePattern(singleName: string) {
  return `(${singleName}(?:(?:-[${letter}]?(?!\\s))|(?:-${singleName})?))`;
}

/**
 * Gets the full name pattern.
 * @param doubleName - The double name pattern.
 * @returns The full name pattern.
 */
function getFullNamePattern(doubleName: string) {
  return `${doubleName}(?:\\s${doubleName})*(?:\\s[${letter}]?)?`;
}

// export const namePattern = getNamePattern();

function getFirstNamePattern(): RegExp {
  const singleName = getSingleNamePattern();
  const doubleName = getDoubleNamePattern(singleName);
  return new RegExp(`^${doubleName}`, 'i');
}

export const firstNamePattern = getFirstNamePattern();

function getLastNamePattern(): RegExp {
  const singleName = getSingleNamePattern();
  const doubleName = getDoubleNamePattern(singleName);
  return new RegExp(`(?:\\s${doubleName})*`, 'i'); // $ and tolerance!!!
}

export const lastNamePattern = getLastNamePattern();

/**
 * Gets the email pattern.
 * @returns The email pattern.
 */
function getEmailPattern() {
  const userName = getUserNamePattern();
  const domainName = getDomainNamePattern();
  const topLevelDomain = getTopLevelDomainPattern();
  return new RegExp(`^${userName}@${domainName}\\.${topLevelDomain}$`, 'i');
}

/**
 * Gets the user name pattern.
 * @returns The user name pattern.
 */
function getUserNamePattern() {
  return `[${digit}${letter}._%+\\-]+`;
}

/**
 * Gets the domain name pattern.
 * @returns The domain name pattern.
 */
function getDomainNamePattern() {
  return `[${digit}${letter}.\\-]+`;
}

/**
 * Gets the top level domain pattern.
 * @returns The top level domain pattern.
 */
function getTopLevelDomainPattern() {
  return `[${letter}]{2,}`;
}

// export const emailPattern = getEmailPattern();

function getPasswordPattern() {
  const lockAhead = getLockAheadPattern();
  const password = `[${digit}${upperCase}${lowerCase}${specialChar}]{8,}`;
  return new RegExp(`^${lockAhead}${password}$`);
}

function getLockAheadPattern() {
  const d = getLockAhead(digit);
  const uC = getLockAhead(upperCase);
  const lC = getLockAhead(lowerCase);
  const sC = getLockAhead(specialChar);
  return d + uC + lC + sC;
}

function getLockAhead(chars: string) {
  return `(?=.*[${chars}])`;
}

// export const passwordPattern = getPasswordPattern();
