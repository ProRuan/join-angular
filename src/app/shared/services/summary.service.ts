import { inject, Injectable } from '@angular/core';
import { DateFormatterService } from './date-formatter.service';
import { Task } from '../models/task';
import { Summary } from '../models/summary';
import { getArrayCopy, getMonthName } from '../ts/global';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a summary service.
 */
export class SummaryService {
  dateFormatter: DateFormatterService = inject(DateFormatterService);

  tasks: Task[] = [];
  summary: Summary = new Summary();

  /**
   * Gets an updated summary by user tasks.
   * @param tasks - The user tasks.
   * @returns The updated summary.
   */
  get(tasks: Task[]) {
    this.tasks = tasks;
    this.updateSummary();
    return this.summary;
  }

  /**
   * Updates a summary.
   */
  updateSummary() {
    this.updateSummaryTasksByColumns();
    this.updateSummaryTasksByTotal();
    this.updateSummaryTasksByPrio();
  }

  /**
   * Updates summary tasks by columns.
   */
  updateSummaryTasksByColumns() {
    let tasks = this.getSummaryTasks();
    this.setSummary('toDo', 'amount', tasks.toDo);
    this.setSummary('done', 'amount', tasks.done);
    this.setSummary('inProgress', 'amount', tasks.inProgress);
    this.setSummary('awaitingFeedback', 'amount', tasks.awaitingFeedback);
  }

  /**
   * Gets summary tasks.
   * @returns The summary tasks.
   */
  getSummaryTasks() {
    return {
      toDo: this.getSummaryTaskAmount('to-do'),
      done: this.getSummaryTaskAmount('done'),
      inProgress: this.getSummaryTaskAmount('in-progress'),
      awaitingFeedback: this.getSummaryTaskAmount('await-feedback'),
    };
  }

  /**
   * Gets a summary task amount.
   * @param column - The board column.
   * @returns The summary task amount.
   */
  getSummaryTaskAmount(column: string) {
    return this.tasks.filter((t) => t.column === column).length;
  }

  /**
   * Sets a summary.
   * @param task - The summary task key.
   * @param property - The summary task property key.
   * @param value - The summary task property value.
   */
  setSummary<T>(task: string, property: string, value: T) {
    this.summary[task][property] = value;
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
    let deadline = this.getUpcomingDeadline(urgentTasks);
    this.setSummary('urgent', 'amount', urgentTasks.length);
    this.setSummary('urgent', 'deadline', deadline);
  }

  /**
   * Gets urgent tasks.
   * @returns The urgent tasks.
   */
  getUrgentTasks() {
    return this.tasks.filter((t) => t.prio === 'urgent');
  }

  /**
   * Gets an upcoming deadline by urgent tasks.
   * @param urgentTasks - The urgent tasks.
   * @returns The upcoming deadline.
   */
  getUpcomingDeadline(urgentTasks: Task[]) {
    let upcomingTask = this.getUpcomingTask(urgentTasks);
    return this.getFormattedDeadline(upcomingTask?.dueDate);
  }

  /**
   * Gets an upcoming task.
   * @param urgentTasks - The urgent tasks.
   * @returns The upcoming task.
   */
  getUpcomingTask(urgentTasks: Task[]) {
    let undoneTasks = urgentTasks.filter((t) => t.column !== 'done');
    let upcomingTasks = undoneTasks.filter((t) => this.isUpcomingTask(t));
    let sortedTasks = this.getSortedTasks(upcomingTasks);
    return sortedTasks.at(0);
  }

  /**
   * Verifies an upcoming task.
   * @param task - The task to verify.
   * @returns A boolean value.
   */
  isUpcomingTask(task: Task) {
    let date = this.dateFormatter.getCalendarDate(task.dueDate);
    return this.dateFormatter.isCurrentDate(date);
  }

  /**
   * Gets sorted tasks.
   * @param upcomingTasks - The upcoming tasks.
   * @returns The sorted tasks.
   */
  getSortedTasks(upcomingTasks: Task[]) {
    let tasks = getArrayCopy(upcomingTasks);
    return tasks.sort((a, b) => this.compareTasks(a, b));
  }

  /**
   * Compares tasks.
   * @param a - The task a.
   * @param b - The task b.
   * @returns A comparable figure.
   */
  compareTasks(a: Task, b: Task) {
    let timeA = this.getTaskDueTime(a);
    let timeB = this.getTaskDueTime(b);
    return timeA - timeB;
  }

  /**
   * Gets a task due time.
   * @param task - The task.
   * @returns The task due time.
   */
  getTaskDueTime(task: Task) {
    let date = this.dateFormatter.getCalendarDate(task.dueDate);
    return new Date(date).getTime();
  }

  /**
   * Gets a formatted deadline.
   * @param dueDate - The due date.
   * @returns The formatted deadline.
   */
  getFormattedDeadline(dueDate?: string) {
    return dueDate ? this.getFormattedDate(dueDate) : 'No';
  }

  /**
   * Gets a formatted date.
   * @param dueDate - The due date.
   * @returns The formatted date.
   */
  getFormattedDate(dueDate: string) {
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
    let date = dueDate.split('/');
    return { day: date[0], month: date[1], year: date[2] };
  }

  /**
   * Gets a formatted month.
   * @param month - The month.
   * @returns The formatted month.
   */
  getFormattedMonth(month: string) {
    let index = Number(month);
    return getMonthName(index);
  }
}
