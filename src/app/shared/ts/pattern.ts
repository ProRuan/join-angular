const DIGITS = '0-9';
const UPPER_CASES = 'A-ZÀ-Ÿ';
const LOWER_CASES = 'a-zà-ÿß';
const SPECIAL_CHARS = '!@#$%^&*';
const letters = LOWER_CASES;

// for name input validation!!!
// ----------------------------
// let testRawPattern = '([a-zà-ÿß]{2,}(?:-([a-zà-ÿß]{2,}))?)';
// let testPattern = new RegExp(`${testRawPattern}`, 'gi');
// let testName = 'Rudolf-Johann Sachslehner-S Wald-Pilz';
// console.log('pattern test: ', testName.match(testPattern));

/**
 * Gets name patterns for the name input validation.
 * @returns The name patterns.
 */
function getNamePatterns() {
  const name = getNamePattern();
  const forbidden = getNameForbiddenPattern();
  const sequence = getNameSequencePattern();
  return { name, forbidden, sequence };
}

/**
 * Gets a name pattern for the name input validation.
 * @returns The name pattern.
 */
function getNamePattern() {
  return new RegExp(`^[${letters}]{2,}`, 'i');
}

/**
 * Gets a forbidden pattern for the name input validation.
 * @returns The forbidden pattern.
 */
function getNameForbiddenPattern() {
  return new RegExp(`[^${letters}\\s-]`, 'i');
}

/**
 * Gets a sequence pattern for the name input validation.
 * @returns The sequence pattern.
 */
function getNameSequencePattern() {
  return new RegExp(`(?:[\\s-][${letters}][\\s-])|(?:[\\s|-]{2,})`, 'i');
}

export const namePatterns = getNamePatterns();

/**
 * Gets email patterns for the email input validation.
 * @returns The email patterns.
 */
function getEmailPatterns() {
  const email = getEmailPattern();
  const forbidden = getEmailForbiddenPattern();
  return { email, forbidden };
}

/**
 * Gets an email pattern for the email input validation.
 * @returns The email pattern.
 */
function getEmailPattern() {
  const userName = getEmailUserName();
  const domain = getEmailDomain();
  const topLevelDomain = getEmailTopLevelDomain();
  return new RegExp(`^${userName}@${domain}\\.${topLevelDomain}$`, 'i');
}

/**
 * Gets a user name pattern for the email input validation.
 * @returns The user name pattern.
 */
function getEmailUserName() {
  return `[${DIGITS}${letters}._%+-]+`;
}

/**
 * Gets a domain pattern for the email input validation.
 * @returns The domain pattern.
 */
function getEmailDomain() {
  return `[${DIGITS}${letters}.-]+`;
}

/**
 * Gets a top-level-domain pattern for the email input validation.
 * @returns The top-level-domain pattern.
 */
function getEmailTopLevelDomain() {
  return `[${letters}]{2,}`;
}

/**
 * Gets a forbidden pattern for the email input validation.
 * @returns The forbidden pattern.
 */
function getEmailForbiddenPattern() {
  return new RegExp(`[^${DIGITS}${letters}._%+-@]`, 'i');
}

export const emailPatterns = getEmailPatterns();

/**
 * Gets password patterns for the password input validation.
 * @returns The password patterns.
 */
function getPasswordPatterns() {
  const digit = getLockaheadPattern(DIGITS);
  const upperCase = getLockaheadPattern(UPPER_CASES);
  const lowerCase = getLockaheadPattern(LOWER_CASES);
  const specialChar = getLockaheadPattern(SPECIAL_CHARS);
  const forbidden = getPasswordForbiddenPattern();
  return { digit, upperCase, lowerCase, specialChar, forbidden };
}

/**
 * Gets a lockahead pattern by a string value.
 * @param value - The string value.
 * @returns The lockahead pattern.
 */
function getLockaheadPattern(value: string) {
  return new RegExp(`(?=.*[${value}])`);
}

/**
 * Gets a forbidden pattern for the password input validation.
 * @returns The forbidden pattern.
 */
function getPasswordForbiddenPattern() {
  return new RegExp(`[^${DIGITS}${letters}${SPECIAL_CHARS}]`, 'i');
}

export const passwordPatterns = getPasswordPatterns();
