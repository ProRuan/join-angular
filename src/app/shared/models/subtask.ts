import { SubtaskData } from '../interfaces/subtask-data';
import { getBoolean, getNumber, getObjectData, getString } from '../ts/global';

/**
 * Class representing a subtask.
 */
export class Subtask {
  id: number;
  text: string;
  done: boolean;
  focused: boolean;

  /**
   * Creates a subtask.
   * @param data - The subtask data.
   */
  constructor(data?: Subtask | SubtaskData) {
    this.id = getNumber(data?.id);
    this.text = getString(data?.text);
    this.done = getBoolean(data?.done);
    this.focused = getBoolean(data?.focused);
  }

  /**
   * Gets a subtask as object.
   * @returns The subtask as object.
   */
  getObject() {
    return getObjectData(this) as SubtaskData;
  }
}
