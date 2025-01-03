import { getObject } from '../ts/global';
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
  constructor() {
    this.toDo = this.getTask('To-do');
    this.done = this.getTask('Done');
    this.urgent = this.getTask('Urgent');
    this.inBoard = this.getTask('Task In Board');
    this.inProgress = this.getTask('Task In Progress');
    this.awaitingFeedback = this.getTask('Awaiting Feedback');
  }

  /**
   * Provides the task object.
   * @param category - The task category.
   * @returns - The task object.
   */
  getTask(category: string) {
    if (category == 'Urgent') {
      return new SummaryTask(category, 'September 2, 2024');
    } else {
      return new SummaryTask(category);
    }
  }

  /**
   * Provides the summary as object.
   * @returns - The summary as object.
   */
  getObject() {
    return {
      toDo: getObject(this.toDo),
      done: getObject(this.done),
      urgent: getObject(this.urgent),
      inBoard: getObject(this.inBoard),
      inProgress: getObject(this.inProgress),
      awaitingFeedback: getObject(this.awaitingFeedback),
    };
  }
}
