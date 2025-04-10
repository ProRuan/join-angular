import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BiArrowComponent } from '../../../shared/components/svg/bi-arrow/bi-arrow.component';
import { JoinService } from '../../../shared/services/join.service';
import { BoardService } from '../../../shared/services/board.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { Task } from '../../../shared/models/task';
import {
  getCurrentValue,
  isDefaultArray,
  stopPropagation,
} from '../../../shared/ts/global';

@Component({
  selector: 'app-draggable-task',
  standalone: true,
  imports: [CommonModule, BiArrowComponent],
  templateUrl: './draggable-task.component.html',
  styleUrl: './draggable-task.component.scss',
})

/**
 * Class representing a draggable task component.
 * @implements {OnChanges}
 */
export class DraggableTaskComponent implements OnChanges {
  join: JoinService = inject(JoinService);
  board: BoardService = inject(BoardService);
  dialogs: DialogService = inject(DialogService);

  // check imports ...
  // check onSet() ...

  @ViewChild('settingsBtn') settingsBtnRef!: ElementRef<HTMLButtonElement>;
  @Input() task: Task = new Task();

  descriptionPreview: string = '';
  tempText: string = '';
  max: number = 0;
  alt: string = 'prio_medium';
  rotated: boolean = false;

  /**
   * Gets an amount of done subtasks.
   * @returns The amount of done subtasks.
   */
  get counter() {
    return this.task.subtasks.filter((s) => s.done).length;
  }

  /**
   * Updates a draggable task component on changes.
   * @param changes - The changes.
   */
  ngOnChanges(changes: SimpleChanges): void {
    let changedTask = getCurrentValue<Task>(changes, 'task');
    this.updateTask(changedTask);
    this.updateDescriptionPreview();
    this.updateTaskSettings();
  }

  /**
   * Updates a draggable task.
   */
  updateTask(changedTask: Task) {
    if (this.isBoardTask(changedTask)) {
      this.task.set(changedTask);
      this.board.task = this.task;
    }
  }

  /**
   * Verifies a task cached at the board service.
   * @param changedTask - The changed task.
   * @returns A boolean value.
   */
  isBoardTask(changedTask: Task) {
    return changedTask.id === this.board.task.id;
  }

  /**
   * Updates a task description preview.
   */
  updateDescriptionPreview() {
    this.tempText = '';
    this.descriptionPreview = this.getDescriptionPreview();
  }

  /**
   * Gets a task description preview.
   * @returns The task description preview.
   */
  getDescriptionPreview() {
    let text = this.task.description;
    if (text.length > 50) {
      let texts = text.split(' ');
      this.setTempText(texts);
      return `${this.tempText} ...`;
    } else {
      return text;
    }
  }

  /**
   * Sets a temporary text.
   * @param texts - The text portions.
   */
  setTempText(texts: string[]) {
    for (let t of texts) {
      let textPreview = this.tempText + ` ${t}`;
      if (textPreview.length > 46) {
        break;
      } else {
        this.tempText += ` ${t}`;
      }
    }
  }

  /**
   * Updates task settings.
   */
  updateTaskSettings() {
    this.max = this.getMax();
    this.alt = this.getAlt();
  }

  /**
   * Gets a maximum amount of subtasks to do.
   * @returns The maximum amount of subtasks to do.
   */
  getMax() {
    return this.task.subtasks.length;
  }

  /**
   * Gets an alternative text.
   * @returns The alternative text.
   */
  getAlt() {
    return `prio_${this.task.prio}`;
  }

  /**
   * Gets the css class of a draggable task rotation.
   * @returns The css class of the draggable task rotation.
   */
  getRotationClass() {
    return this.rotated ? 'rotated' : '';
  }

  /**
   * Starts a drag on dragstart.
   */
  onDragStart() {
    this.rotated = true;
    this.board.setDrag(this.task);
  }

  /**
   * Ends a drag on dragend.
   */
  onDragEnd() {
    this.rotated = false;
  }

  /**
   * Views a task on click.
   */
  onView() {
    this.board.task = this.task;
    this.dialogs.open('viewTask');
  }

  /**
   * Gets the css class of a task.
   * @returns The css class of the task.
   */
  getTaskClass() {
    let subtasksExistent = this.areSubtasksExistent();
    return subtasksExistent ? 'column-24' : 'column-20';
  }

  /**
   * Verifies the existence of subtasks.
   * @returns A boolean value.
   */
  areSubtasksExistent() {
    return !isDefaultArray(this.task.subtasks);
  }

  /**
   * Gets the css class of a category.
   * @returns The css class of the category.
   */
  getCategoryClass() {
    return this.task.category.toLowerCase().replace(' ', '-');
  }

  onSet(event: Event) {
    const settingsBtn = this.settingsBtnRef.nativeElement;

    const rect = settingsBtn.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX;

    const flexibleLeft = this.getLeft(left);
    const felxibleTop = this.getTop(top);

    this.dialogs.posStyles = {
      position: 'absoulte',
      left: `${flexibleLeft}px`,
      top: `${felxibleTop}px`,
      zIndex: '10',
    };

    this.board.task = this.task;
    this.dialogs.open('taskSettings');
    stopPropagation(event);
  }

  /**
   * Gets a modified position-left value.
   * @param left - The position-left value.
   * @returns The modified position-left value.
   */
  private getLeft(left: number) {
    if (window.innerWidth - 159 < left) {
      return left - 194;
    } else if (left + 30 < 46) {
      return left + 30;
    } else {
      return left;
    }
  }

  /**
   * Gets a modified position-top value.
   * @param top - The position-top value.
   * @returns The modified position-top value.
   */
  private getTop(top: number) {
    if (window.innerHeight - 199 < top) {
      return top - 119;
    } else if (top + 28 < 108) {
      return top + 28;
    } else {
      return top;
    }
  }

  /**
   * Gets the style of a progress bar.
   * @returns The style of the progress bar.
   */
  getStyle() {
    let progress = (128 / this.max) * this.counter;
    let value = Math.round(progress);
    return { width: `${value}px` };
  }

  /**
   * Gets a source path.
   * @returns The source path.
   */
  getSrc() {
    return `/assets/img/board/${this.alt}.png`;
  }
}
