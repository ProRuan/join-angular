import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SummaryTask } from '../../../shared/models/summary-task';

@Component({
  selector: 'app-sum-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sum-card.component.html',
  styleUrl: './sum-card.component.scss',
})

/**
 * Class representing a sum card component.
 */
export class SumCardComponent {
  cardContClass: string = '';
  cardClass: string = '';
  iconContClass: string = '';
  icon: string = '';
  iconClass: string = '';
  iconless: boolean = false;
  taskInfoClass: string = '';
  categoryClass: string = '';
  urgent: boolean = false;

  // check html, css, ts ...
  // complete responsiveness ...
  // fix icon transition (svg or visibility?) ...

  @Input() task: SummaryTask = new SummaryTask();

  /**
   * Initializes a sum card component.
   */
  ngOnInit() {
    this.cardContClass = this.getCardClass('card-cont');
    this.cardClass = this.getCardClass('card');
    this.iconContClass = this.getIconContClass();
    this.icon = this.getIcon();
    this.iconClass = this.getIconClass();
    this.iconless = this.isIconlessCategory();
    this.taskInfoClass = this.getTaskInfoClass();
    this.categoryClass = this.getCategoryClass();
    this.urgent = this.isCategory('Urgent');
  }

  /**
   * Gets the css class of a card.
   * @param className - The class name.
   * @returns The css class of the card.
   */
  getCardClass(className: string) {
    if (this.isCategory('Urgent')) {
      return `${className}-large`;
    } else if (this.isCategory('To-do') || this.isCategory('Done')) {
      return `${className}-medium`;
    } else {
      return `${className}-small`;
    }
  }

  /**
   * Verifies a task category.
   * @param category - The task category.
   * @returns A boolean value.
   */
  isCategory(category: string) {
    return this.task.category == category;
  }

  /**
   * Gets the css class of an icon container.
   * @param className - The class name.
   * @returns The css class of the icon container.
   */
  getIconContClass() {
    let className = 'card-icon-cont';
    return this.isCategory('Urgent') ? `${className}-urgent` : className;
  }

  /**
   * Gets a task icon.
   * @returns The task icon.
   */
  getIcon() {
    if (this.isCategory('Urgent')) return 'urgent';
    else if (this.isCategory('Done')) return 'done';
    else return 'to-do';
  }

  /**
   * Gets the css class of an icon.
   * @returns The css class of the icon.
   */
  getIconClass() {
    return `${this.icon}-icon`;
  }

  /**
   * Verifies a iconless category.
   * @returns A boolean value.
   */
  isIconlessCategory() {
    let taskInBoard = this.isCategory('Tasks In Board');
    let taskInProgress = this.isCategory('Tasks In Progress');
    let awaitingFeedback = this.isCategory('Awaiting Feedback');
    return taskInBoard || taskInProgress || awaitingFeedback;
  }

  /**
   * Gets the css class of a task info.
   * @returns The css class of the task info.
   */
  getTaskInfoClass() {
    return this.isIconlessCategory() ? `mw-80` : '';
  }

  /**
   * Gets the css class of a category.
   * @returns The css class of the category.
   */
  getCategoryClass() {
    return this.isCategory('Urgent') ? 'category-urgent' : 'category';
  }
}
