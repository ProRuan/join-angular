import { Contact } from '../models/contact';

/**
 * Interface representing a register.
 */
export interface Register {
  letter: string;
  contacts: Contact[];
}
