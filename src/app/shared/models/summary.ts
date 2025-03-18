import { SummaryData } from '../interfaces/summary-data';
import { SummaryTaskData } from '../interfaces/summary-task-data';
import { SummaryTask } from './summary-task';
import { getObjectData } from '../ts/global';

/**
 * Class representing a summary.
 */
export class Summary {
  [key: string]: any;
  toDo: SummaryTask;
  done: SummaryTask;
  urgent: SummaryTask;
  inBoard: SummaryTask;
  inProgress: SummaryTask;
  awaitingFeedback: SummaryTask;

  // requiredValidator with this.rejected ...

  // add property sum label ... ?
  // rename to sum-card ... ?
  // summary deadline with column (not category) ... !
  // fix summary update after sign-up - check?

  // string with dash or not ... ? (check side of summary task)

  // to-do, done, in-progress, await-feedback, in-board ... (5/6)
  //   --> task column (not category) ... !

  // reset urgent summary task ...

  // update deadline default: "No" ...

  // notes
  // -----
  // task.column: string with "-" ...
  // check await feedback or awaiting feedback ...

  /**
   * Creates a summary.
   */
  constructor(data?: Summary | SummaryData) {
    this.toDo = this.getSummaryTask('To-do', data?.toDo);
    this.done = this.getSummaryTask('Done', data?.done);
    this.urgent = this.getSummaryTask('Urgent', data?.urgent);
    this.inBoard = this.getSummaryTask('Tasks In Board', data?.inBoard);
    this.inProgress = this.getSummaryTask(
      'Tasks In Progress',
      data?.inProgress
    );
    this.awaitingFeedback = this.getSummaryTask(
      'Awaiting Feedback',
      data?.awaitingFeedback
    );
  }

  /**
   * Gets a summary task.
   * @param category - The summary task category.
   * @param data - The summary task data.
   * @returns The summary task.
   */
  private getSummaryTask(
    category: string,
    data?: SummaryTask | SummaryTaskData
  ) {
    if (data) {
      return this.getUpdatedSummaryTask(data);
    } else {
      return this.getAddedSummaryTask(category);
    }
  }

  /**
   * Gets an updated summary task.
   * @param data - The summary task data.
   * @returns The updated summary task.
   */
  private getUpdatedSummaryTask(data: SummaryTask | SummaryTaskData) {
    return new SummaryTask(data);
  }

  /**
   * Gets an added summary task.
   * @param category - The summary task category.
   * @returns The added summary task.
   */
  private getAddedSummaryTask(category: string) {
    const defaultTask = this.getDefaultSummaryTask(category);
    return new SummaryTask(defaultTask);
  }

  /**
   * Gets a default summary task.
   * @param category - The summary task category.
   * @returns The default summary task.
   */
  private getDefaultSummaryTask(category: string) {
    if (category == 'Urgent') {
      return { category: category, amount: 0, deadline: 'none' };
    } else {
      return { category: category, amount: 0 };
    }
  }

  /**
   * Gets a summary as object.
   * @returns The summary as object.
   */
  getObject() {
    let data = getObjectData(this);
    this.convertObjectData(data);
    return data as SummaryData;
  }

  /**
   * Converts object data.
   * @param data - The object data.
   */
  private convertObjectData(data: this) {
    for (const [key, value] of Object.entries(data)) {
      data[key] = value.getObject();
    }
  }
}
