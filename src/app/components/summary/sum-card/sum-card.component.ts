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
 * Represents a sum card component.
 */
export class SumCardComponent {
  icon: string = '';
  defaultPath: string = '';
  hoverPath: string = '';
  currentPath: string = '';

  @Input() task: SummaryTask = new SummaryTask('urgent');

  /**
   * Initializes the sum card component.
   */
  ngOnInit() {
    this.icon = this.getIcon();
    this.defaultPath = this.getPath();
    this.hoverPath = this.getPath('hover');
    this.currentPath = this.defaultPath;
  }

  /**
   * Provides the icon of the task.
   * @returns - The icon of the task.
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
   * Verifies the task category.
   * @param category - The task category to match.
   * @returns - A boolean value.
   */
  isCategory(category: string) {
    return this.task.category == category;
  }

  /**
   * Provides the source path.
   * @param hover - A boolean value.
   * @returns - The source path.
   */
  getPath(hover?: string) {
    if (hover && !this.isCategory('Urgent')) {
      return `./assets/img/summary/${this.icon}_${hover}.png`;
    } else {
      return `./assets/img/summary/${this.icon}.png`;
    }
  }

  /**
   * Provides the css class of the card.
   * @returns - The css class of the card.
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
   * Sets the current path of the icon.
   * @param logical - A boolean value.
   */
  setPath(logical: boolean) {
    this.currentPath = logical ? this.hoverPath : this.defaultPath;
  }

  /**
   * Provides the css class of the icon.
   * @returns - The css class to apply.
   */
  getIconClass(element: string) {
    if (this.isCategory('Urgent')) {
      return `${element}-urgent`;
    } else {
      return element;
    }
  }

  /**
   * Provides the css class for the max-width.
   * @returns - The css class to apply.
   */
  getMaxWidthClass() {
    return this.isIconlessCategory() ? `mw-80` : '';
  }

  /**
   * Verifies the iconless category.
   * @returns - A boolean value.
   */
  isIconlessCategory() {
    let taskInBoard = this.isCategory('Task In Board');
    let taskInProgress = this.isCategory('Task In Progress');
    let awaitingFeedback = this.isCategory('Awaiting Feedback');
    return taskInBoard || taskInProgress || awaitingFeedback;
  }

  /**
   * Provides the css class of the category.
   * @returns - The css class to apply.
   */
  getCategoryClass() {
    return this.isCategory('Urgent') ? 'category-urgent' : 'category';
  }
}
