const DIGITS = '0-9';
const UPPER_CASES = 'A-ZÀ-Ÿ';
const LOWER_CASES = 'a-zà-ÿß';
const SPECIAL_CHARS = '!@#$%^&*';

/**
 * Gets name patterns.
 * @returns The name patterns.
 */
function getNamePatterns() {
  const name = getNamePattern();
  const forbidden = getNameForbiddenPattern();
  const sequence = getNameSequencePattern();
  return { name, forbidden, sequence };
}

/**
 * Gets a name pattern.
 * @returns The name pattern.
 */
function getNamePattern() {
  return getPattern(`^[${LOWER_CASES}]{2,}`, 'i');
}

/**
 * Gets a pattern.
 * @param pattern - The pattern.
 * @param flags - The flags.
 * @returns The pattern.
 */
function getPattern(pattern: string, flags?: string) {
  return new RegExp(pattern, flags);
}

/**
 * Gets a forbidden pattern for names.
 * @returns The forbidden pattern for names.
 */
function getNameForbiddenPattern() {
  return getPattern(`[^${LOWER_CASES}\\s-]`, 'i');
}

/**
 * Gets a sequence pattern for names.
 * @returns The sequence pattern for names.
 */
function getNameSequencePattern() {
  return getPattern(`(?:[\\s-][${LOWER_CASES}][\\s-])|(?:[\\s|-]{2,})`, 'i');
}

export const namePatterns = getNamePatterns();

/**
 * Gets a double name pattern.
 * @returns The double name pattern.
 */
function getDoubleNamePattern() {
  return getPattern(`[${LOWER_CASES}]{2,}(:?-[${LOWER_CASES}]{2,})?`, 'gi');
}

export const doubleNamePattern = getDoubleNamePattern();

/**
 * Gets email patterns.
 * @returns The email patterns.
 */
function getEmailPatterns() {
  const email = getEmailPattern();
  const forbidden = getEmailForbiddenPattern();
  return { email, forbidden };
}

/**
 * Gets an email pattern.
 * @returns The email pattern.
 */
function getEmailPattern() {
  const userName = getEmailUserNamePattern();
  const domain = getEmailDomainPattern();
  const topLevelDomain = getEmailTopLevelDomainPattern();
  return getPattern(`^${userName}@${domain}\\.${topLevelDomain}$`, 'i');
}

/**
 * Gets a user name pattern for emails.
 * @returns The user name pattern for emails.
 */
function getEmailUserNamePattern() {
  return `[${DIGITS}${LOWER_CASES}._%+-]+`;
}

/**
 * Gets a domain pattern for emails.
 * @returns The domain pattern for emails.
 */
function getEmailDomainPattern() {
  return `[${DIGITS}${LOWER_CASES}.-]+`;
}

/**
 * Gets a top-level-domain pattern for emails.
 * @returns The top-level-domain pattern for emails.
 */
function getEmailTopLevelDomainPattern() {
  return `[${LOWER_CASES}]{2,}`;
}

/**
 * Gets a forbidden pattern for emails.
 * @returns The forbidden pattern for emails.
 */
function getEmailForbiddenPattern() {
  return getPattern(`[^${DIGITS}${LOWER_CASES}._%+-@]`, 'i');
}

export const emailPatterns = getEmailPatterns();

/**
 * Gets password patterns.
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
  return getPattern(`(?=.*[${value}])`);
}

/**
 * Gets a forbidden pattern for passwords.
 * @returns The forbidden pattern for passwords.
 */
function getPasswordForbiddenPattern() {
  return getPattern(`[^${DIGITS}${LOWER_CASES}${SPECIAL_CHARS}]`, 'i');
}

export const passwordPatterns = getPasswordPatterns();

/**
 * Gets due date patterns.
 * @returns - The due date patterns.
 */
function getDueDatePatterns() {
  const dueDate = getDueDatePattern();
  const forbidden = getDueDateForbiddenPattern();
  return { dueDate, forbidden };
}

/**
 * Gets a due date pattern.
 * @returns - The due date pattern.
 */
function getDueDatePattern() {
  return getPattern(`^(\\d{1,2})\/(\\d{1,2})\/(\\d{4})$`);
}

/**
 * Gets a forbidden pattern for due dates.
 * @returns - The forbidden pattern for due dates.
 */
function getDueDateForbiddenPattern() {
  return getPattern(`[^\\d\\/]`);
}

export const dueDatePatterns = getDueDatePatterns();

/**
 * Gets phone patterns.
 * @returns The phone patterns.
 */
function getPhonePatterns() {
  const phone = getPhonePattern();
  const forbidden = getPhoneForbiddenPattern();
  return { phone, forbidden };
}

/**
 * Gets a phone pattern.
 * @returns The phone pattern.
 */
function getPhonePattern() {
  return getPattern(`^$|^(?=.*\\d)\\+?[${DIGITS}\\s]+$`);
}

/**
 * Gets a phone forbidden pattern.
 * @returns The phone forbidden pattern.
 */
function getPhoneForbiddenPattern() {
  return getPattern(`[^\\+${DIGITS}\\s]`);
}

export const phonePatterns = getPhonePatterns();
