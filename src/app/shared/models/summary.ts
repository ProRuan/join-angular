import { SummaryData } from '../interfaces/summary-data';
import { SummaryTaskData } from '../interfaces/summary-task-data';
import { SummaryTask } from './summary-task';

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
  getSummaryTask(category: string, data?: SummaryTask | SummaryTaskData) {
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
  getUpdatedSummaryTask(data: SummaryTask | SummaryTaskData) {
    return new SummaryTask(data);
  }

  /**
   * Gets an added summary task.
   * @param category - The summary task category.
   * @returns The added summary task.
   */
  getAddedSummaryTask(category: string) {
    const defaultTask = this.getDefaultSummaryTask(category);
    return new SummaryTask(defaultTask);
  }

  /**
   * Gets a default summary task.
   * @param category - The summary task category.
   * @returns The default summary task.
   */
  getDefaultSummaryTask(category: string) {
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
  getObject(): SummaryData {
    return {
      toDo: this.toDo.getObject(),
      done: this.done.getObject(),
      urgent: this.urgent.getObject(),
      inBoard: this.inBoard.getObject(),
      inProgress: this.inProgress.getObject(),
      awaitingFeedback: this.awaitingFeedback.getObject(),
    };
  }
}
