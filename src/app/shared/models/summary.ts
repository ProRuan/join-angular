import { SummaryData } from '../interfaces/summary-data';
import { SummaryTask } from './summary-task';
import { getObjectData } from '../ts/global';

type Data = Summary | SummaryData;

/**
 * Class representing a summary.
 */
export class Summary {
  [key: string]: any;
  toDo = new SummaryTask();
  done = new SummaryTask();
  urgent = new SummaryTask();
  inBoard = new SummaryTask();
  inProgress = new SummaryTask();
  awaitingFeedback = new SummaryTask();

  /**
   * Creates a summary.
   */
  constructor(data?: Data) {
    this.setSummaryTask('To-do', 'toDo', data);
    this.setSummaryTask('Done', 'done', data);
    this.setSummaryTask('Urgent', 'urgent', data);
    this.setSummaryTask('Tasks In Board', 'inBoard', data);
    this.setSummaryTask('Tasks In Progress', 'inProgress', data);
    this.setSummaryTask('Awaiting Feedback', 'awaitingFeedback', data);
  }

  /**
   * Sets a summary task.
   * @param category - The summary task category.
   * @param key - The summary property key.
   * @param data - The summary data.
   */
  private setSummaryTask(category: string, key: string, data?: Data) {
    data ? this.setByData(key, data) : this.setByCategory(category, key);
  }

  /**
   * Sets a summary task by data.
   * @param key - The summary property key.
   * @param data - The summary data.
   */
  private setByData(key: string, data: Data) {
    this[key] = new SummaryTask(data[key]);
  }

  /**
   * Sets a summary task by category.
   * @param category - The summary task category.
   * @param key - The summary property key.
   */
  private setByCategory(category: string, key: string) {
    let data = this.getSummaryTaskData(category);
    this[key] = new SummaryTask(data);
  }

  /**
   * Gets summary task data.
   * @param category - The summary task category.
   * @returns The summary task data.
   */
  private getSummaryTaskData(category: string) {
    if (category == 'Urgent') {
      return { category: category, amount: 0, deadline: 'No' };
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
