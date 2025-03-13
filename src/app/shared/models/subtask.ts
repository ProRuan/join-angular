import { getBoolean, getNumber, getObject, getString } from '../ts/global';

/**
 * Class representing a subtask.
 */
export class Subtask {
  id: number;
  text: string;
  done: boolean;
  focussed: boolean;

  /**
   * Creates a subtask.
   * @param data - The subtask data.
   */
  constructor(data?: Subtask) {
    this.id = getNumber(data?.id);
    this.text = getString(data?.text);
    this.done = getBoolean(data?.done);
    this.focussed = getBoolean(data?.focussed);
  }

  /**
   * Gets á subtask as object.
   * @returns The subtask as object.
   */
  getObject() {
    return getObject<Subtask>(this);
  }
}
