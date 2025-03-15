import { SummaryTaskData } from '../interfaces/summary-task-data';
import { getNumber, getObjectData, getString } from '../ts/global';

/**
 * Class representing a summary task.
 */
export class SummaryTask {
  category: string;
  amount: number;
  deadline?: string;

  /**
   * Creates a summary task.
   * @param data - The summary task data.
   */
  constructor(data?: SummaryTask | SummaryTaskData) {
    this.category = getString(data?.category);
    this.amount = getNumber(data?.amount);
    if (data?.deadline) {
      this.deadline = getString(data?.deadline);
    }
  }

  /**
   * Gets a summary task as object.
   * @returns The summary task as object.
   */
  getObject() {
    return getObjectData(this) as SummaryTaskData;
  }
}
