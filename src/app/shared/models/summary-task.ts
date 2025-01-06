import { SummaryTaskData } from '../interfaces/summary-task-data';
import { getNumber, getObject, getString } from '../ts/global';

/**
 * Represents a summary task.
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
   * Provides the summary task as object.
   * @returns - The summary task as object.
   */
  getObject() {
    return getObject<SummaryTask>(this);
  }
}
