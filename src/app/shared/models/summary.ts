import { SummaryTask } from './summary-task';

/**
 * Represents a summary.
 */
export class Summary {
  toDo: SummaryTask;
  done: SummaryTask;
  urgent: SummaryTask;
  inBoard: SummaryTask;
  inProgress: SummaryTask;
  awaitingFeedback: SummaryTask;

  /**
   * Creates a summary.
   */
  constructor(data?: Summary) {
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
   * Provides the summary task.
   * @param category - The summary task category.
   * @param data - The summary task data.
   * @returns - The summary task.
   */
  getSummaryTask(category: string, data?: SummaryTask) {
    if (data) {
      return this.getUpdatedSummaryTask(data);
    } else {
      return this.getAddedSummaryTask(category);
    }
  }

  /**
   * Provides the updated summary task.
   * @param data - The summary task data.
   * @returns - The updated summary task.
   */
  getUpdatedSummaryTask(data: SummaryTask) {
    return new SummaryTask(data);
  }

  /**
   * Provides the added summary task.
   * @param category - The summary task category.
   * @returns - The added summary task.
   */
  getAddedSummaryTask(category: string) {
    const defaultTask = this.getDefaultSummaryTask(category);
    return new SummaryTask(defaultTask);
  }

  /**
   * Provides the default summary task.
   * @param category - The summary task category.
   * @returns - The default summary task.
   */
  getDefaultSummaryTask(category: string) {
    if (category == 'Urgent') {
      return { category: category, amount: 0, deadline: 'none' };
    } else {
      return { category: category, amount: 0 };
    }
  }

  /**
   * Provides the summary as object.
   * @returns - The summary as object.
   */
  getObject() {
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
