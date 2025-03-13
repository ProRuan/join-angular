import { inject, Injectable } from '@angular/core';
import { JoinService } from './join.service';
import { Task } from '../models/task';
import { getMonthName } from '../ts/global';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a summary service.
 */
export class SummaryService {
  join: JoinService = inject(JoinService);

  /**
   * Gets user tasks.
   * @returns The user tasks.
   */
  get tasks() {
    return this.join.user.tasks;
  }

  /**
   * Updates a user summary.
   */
  update() {
    this.updateSummaryTasksByColumns();
    this.updateSummaryTasksByTotal();
    this.updateSummaryTasksByPrio();
  }

  /**
   * Updates summary tasks by columns.
   */
  updateSummaryTasksByColumns() {
    let tasks = this.getSummaryTasksByColumns();
    this.setSummary('toDo', 'amount', tasks.toDo);
    this.setSummary('done', 'amount', tasks.done);
    this.setSummary('inProgress', 'amount', tasks.inProgress);
    this.setSummary('awaitingFeedback', 'amount', tasks.awaitingFeedback);
  }

  /**
   * Gets summary tasks by columns.
   * @returns The summary tasks.
   */
  getSummaryTasksByColumns() {
    return {
      toDo: this.getSummaryTasksAmount('to-do'),
      done: this.getSummaryTasksAmount('done'),
      inProgress: this.getSummaryTasksAmount('in progress'),
      awaitingFeedback: this.getSummaryTasksAmount('awaiting feedback'),
    };
  }

  /**
   * Gets an amount of summary tasks.
   * @param column - The board column.
   * @returns The amount of the summary tasks.
   */
  getSummaryTasksAmount(column: string) {
    let filteredTasks = this.tasks.filter((t) => t.column == column);
    return filteredTasks.length;
  }

  /**
   * Sets a summary.
   * @param task - The key of the summary task.
   * @param property - The property key of the summary task.
   * @param value - The property value of the summary tasks.
   */
  setSummary<T>(task: string, property: string, value: T) {
    this.join.user.summary[task][property] = value;
  }

  /**
   * Updates summary tasks by total.
   */
  updateSummaryTasksByTotal() {
    let amount = this.tasks.length;
    this.setSummary('inBoard', 'amount', amount);
  }

  /**
   * Updates summary tasks by prio.
   */
  updateSummaryTasksByPrio() {
    let urgentTasks = this.getUrgentTasks();
    let deadline = this.getUpcomingTaskDeadline(urgentTasks);
    this.setSummary('urgent', 'amount', urgentTasks.length);
    this.setSummary('urgent', 'deadline', deadline);
  }

  /**
   * Gets urgent tasks.
   * @returns The urgent tasks.
   */
  getUrgentTasks() {
    let undoneTasks = this.tasks.filter((t) => t.category != 'done');
    let urgentTasks = undoneTasks.filter((t) => t.prio == 'urgent');
    return urgentTasks;
  }

  /**
   * Gets the deadline of an upcoming task.
   * @param tasks - The urgent tasks.
   * @returns The deadline of the upcoming task.
   */
  getUpcomingTaskDeadline(tasks: Task[]) {
    let index = this.getUpcomingTaskIndex(tasks);
    let deadline = this.getUpcomingDeadline(tasks, index);
    return deadline;
  }

  /**
   * Gets the index of an upcoming task.
   * @param - The urgent tasks.
   * @returns The index of the upcoming task.
   */
  getUpcomingTaskIndex(tasks: Task[]) {
    let index = -1;
    let upcomingTime = 0;
    tasks.forEach((task, i) => {
      let time = new Date(task.dueDate).getTime();
      if (upcomingTime == 0 || time < upcomingTime) {
        index = i;
        upcomingTime = time;
      }
    });
    return index;
  }

  /**
   * Gets an upcoming deadline.
   * @param tasks - The urgent tasks.
   * @param index - The index of the upcoming task.
   * @returns The upcoming deadline.
   */
  getUpcomingDeadline(tasks: Task[], index: number) {
    let deadline = '';
    if (index > -1) {
      let upcomingTask = tasks[index];
      let dueDate = upcomingTask.dueDate;
      deadline = this.getFormattedDeadline(dueDate);
    }
    return deadline;
  }

  /**
   * Gets a formatted deadline.
   * @param dueDate - The due date.
   * @returns The formatted deadline.
   */
  getFormattedDeadline(dueDate: string) {
    let date = this.getDateObject(dueDate);
    date.month = this.getFormattedMonth(date.month);
    return `${date.month} ${date.day}, ${date.year}`;
  }

  /**
   * Gets a date object.
   * @param dueDate - The due date.
   * @returns The date object.
   */
  getDateObject(dueDate: string) {
    let date = dueDate.split('-');
    return { day: date[2], month: date[1], year: date[0] };
  }

  /**
   * Gets a formatted month.
   * @param month - The month.
   * @returns The formatted month.
   */
  getFormattedMonth(month: string) {
    let index = parseInt(month);
    let monthName = getMonthName(index);
    return monthName;
  }
}
