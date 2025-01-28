import { Contact } from '../models/contact';

/**
 * Represents a register.
 */
export interface Register {
  letter: string;
  contacts: Contact[];
}
