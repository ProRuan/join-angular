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
  icon: string = '';
  defaultPath: string = '';
  hoverPath: string = '';
  currentPath: string = '';

  @Input() task: SummaryTask = new SummaryTask();

  /**
   * Initializes a sum card component.
   */
  ngOnInit() {
    this.icon = this.getIcon();
    this.defaultPath = this.getPath();
    this.hoverPath = this.getPath('hover');
    this.currentPath = this.defaultPath;
  }

  /**
   * Gets a task icon.
   * @returns The task icon.
   */
  getIcon() {
    if (this.isCategory('Urgent')) {
      return 'urgent';
    } else if (this.isCategory('Done')) {
      return 'done';
    } else {
      return 'to_do';
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
   * Gets a source path.
   * @param hover - A boolean value.
   * @returns The source path.
   */
  getPath(hover?: string) {
    if (hover && !this.isCategory('Urgent')) {
      return `./assets/img/summary/${this.icon}_${hover}.png`;
    } else {
      return `./assets/img/summary/${this.icon}.png`;
    }
  }

  /**
   * Gets the css class of a card.
   * @returns The css class of the card.
   */
  getCardClass(element: string) {
    if (this.isCategory('Urgent')) {
      return `${element}-large`;
    } else if (this.isCategory('To-do') || this.isCategory('Done')) {
      return `${element}-medium`;
    } else {
      return `${element}-small`;
    }
  }

  /**
   * Sets the current path of an icon.
   * @param logical - A boolean value.
   */
  setPath(logical: boolean) {
    this.currentPath = logical ? this.hoverPath : this.defaultPath;
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
   * Gets the css class of an icon.
   * @returns The css class of the icon.
   */
  getIconClass(element: string) {
    return this.isCategory('Urgent') ? `${element}-urgent` : element;
  }

  /**
   * Gets the css class for the max-width.
   * @returns The css class for the max-width.
   */
  getMaxWidthClass() {
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
