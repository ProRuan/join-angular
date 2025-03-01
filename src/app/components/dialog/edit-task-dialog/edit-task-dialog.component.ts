import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TitleInputComponent } from '../../../shared/components/inputs/title-input/title-input.component';
import { DescriptionInputComponent } from '../../../shared/components/inputs/description-input/description-input.component';
import { DueDateInputComponent } from '../../../shared/components/inputs/due-date-input/due-date-input.component';
import { PrioInputComponent } from '../../../shared/components/inputs/prio-input/prio-input.component';
import { AssignedToInputComponent } from '../../../shared/components/inputs/assigned-to-input/assigned-to-input.component';
import { SubtasksInputComponent } from '../../../shared/components/inputs/subtasks-input/subtasks-input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { JoinDialog } from '../../../shared/models/join-dialog';
import { JoinService } from '../../../shared/services/join.service';
import { InputValidatorService } from '../../../shared/services/input-validator.service';
import { DateFormatterService } from '../../../shared/services/date-formatter.service';
import { SummaryService } from '../../../shared/services/summary.service';
import { BoardService } from '../../../shared/services/board.service';
import { JoinButton } from '../../../shared/models/join-button';
import { Task } from '../../../shared/models/task';
import { stop } from '../../../shared/ts/global';

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TitleInputComponent,
    DescriptionInputComponent,
    DueDateInputComponent,
    PrioInputComponent,
    AssignedToInputComponent,
    SubtasksInputComponent,
    ButtonComponent,
  ],
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.scss',
})

/**
 * Class representing an edit-task dialog component.
 * @extends FormController
 */
export class EditTaskDialogComponent extends JoinDialog implements OnChanges {
  join: JoinService = inject(JoinService);
  validators: InputValidatorService = inject(InputValidatorService);
  formatter: DateFormatterService = inject(DateFormatterService);
  summary: SummaryService = inject(SummaryService);
  board: BoardService = inject(BoardService);

  // reset on close and on update ...
  //   --> form, board.task, task, calendar, search, subtask ...

  calendar: AbstractControl | null = null;
  search: AbstractControl | null = null;
  subtask: AbstractControl | null = null;
  okBtn = new JoinButton('okBtn');

  override id: string = 'editTask';

  @Input() task = new Task();

  /**
   * Gets user contacts.
   */
  get contacts() {
    return this.join.user.contacts;
  }

  /**
   * Updates an edit-task component on changes.
   * @param changes - The changes.
   */
  ngOnChanges(changes: SimpleChanges): void {
    let task = this.getTask(changes);
    this.updateForm(task);
    this.updateCalendar(task.dueDate);
  }

  /**
   * Gets a task.
   * @param changes - The changes.
   * @returns The task.
   */
  getTask(changes: SimpleChanges) {
    return changes['task'].currentValue;
  }

  /**
   * Updates a form.
   * @param task - The task to set.
   */
  updateForm(task: Task) {
    this.form.patchValue(task);
  }

  /**
   * Updates a calendar.
   * @param dueDate - The task due date.
   */
  updateCalendar(dueDate: string) {
    let date = this.formatter.getCalendarDate(dueDate);
    this.calendar?.setValue(date);
  }

  /**
   * Initializes an edit-task component.
   */
  ngOnInit() {
    this.setForm();
  }

  /**
   * Sets a form.
   */
  setForm() {
    this.setTaskControls();
    this.setAssistantControls();
  }

  /**
   * Sets a form control for each task property.
   */
  setTaskControls() {
    this.registerControl('title', '', this.validators.required);
    this.registerControl('description', '');
    this.registerControl('dueDate', '', this.validators.dueDate);
    this.registerControl('prio', 'medium');
    this.registerControl('assignedTo', []);
    this.registerControl('subtasks', []);
  }

  /**
   * Sets a form control for each assistant input.
   */
  setAssistantControls() {
    this.calendar = this.getControl('');
    this.search = this.getControl('');
    this.subtask = this.getControl('');
  }

  override getDialogClass() {
    if (!this.isOpened()) {
      return 'closed';
    } else {
      return '';
    }
  }

  override getTransitClass(): string {
    if (!this.isOpened()) {
      return 'go-out';
    } else {
      return '';
    }
  }

  onClose() {
    this.close();
  }

  // onClose() {
  //   this.dialog.close(this.id); // close all?
  //   // this.resetForm();
  // }

  resetForm() {
    this.board.setDefaultTask(); // necessary?
    this.task.set();
    this.resetAssistantControls();

    console.log('board task: ', this.board.task); // done
    console.log('this task: ', this.task); // done
    console.log('calendar: ', this.calendar?.value); // done
    console.log('search: ', this.search?.value); // done
    console.log('subtask: ', this.subtask?.value); // done
  }

  resetAssistantControls() {
    this.calendar?.setValue('');
    this.search?.setValue('');
    this.subtask?.setValue('');
  }

  /**
   * Handles an event on click.
   * @param event - The event.
   */
  onHandle(event: Event): void {
    this.dialog.close('assignedTo');
    this.search?.setValue('');
    stop(event);
  }

  /**
   * Verifies the incompleteness of a form.
   * @returns A boolean value.
   */
  isIncomplete() {
    return this.form.invalid;
  }

  async onUpdate() {
    if (this.form.valid) {
      let task = this.getEditedTask();
      this.board.task.set(task);
      this.summary.update();
      await this.join.saveUser();

      // add other dialog!!!
      this.dialog.close(this.id);
      // this.resetForm();

      // // one method from dialog?!
      // this.dialog.closeDialog(this.id, true);
      // this.dialog.openDialog('viewTask');
    }
  }

  /**
   * Gets an edited task.
   * @returns - The edited task.
   */
  getEditedTask() {
    let task = new Task(this.form.value);
    task.id = this.board.task.id;
    task.column = this.board.task.column;
    task.category = this.board.task.category;
    return task;
  }
}
