import { getBoolean, getNumber, getString } from '../ts/global';

/**
 * Represents a subtask.
 */
export class Subtask {
  index: number;
  text: string;
  done: boolean;
  focussed: boolean;

  /**
   * Creates a subtask.
   * @param subtask - The providing subtask.
   */
  constructor(subtask?: Subtask) {
    this.index = getNumber(subtask?.index);
    this.text = getString(subtask?.text);
    this.done = getBoolean(subtask?.done);
    this.focussed = getBoolean(subtask?.focussed);
  }
}
