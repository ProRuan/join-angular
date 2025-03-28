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
import { TitleInputComponent } from '../../inputs/title-input/title-input.component';
import { DescriptionInputComponent } from '../../inputs/description-input/description-input.component';
import { DueDateInputComponent } from '../../inputs/due-date-input/due-date-input.component';
import { PrioInputComponent } from '../../inputs/prio-input/prio-input.component';
import { AssignedToInputComponent } from '../../inputs/assigned-to-input/assigned-to-input.component';
import { SubtasksInputComponent } from '../../inputs/subtasks-input/subtasks-input.component';
import { ButtonComponent } from '../../button/button.component';
import { dialogAnimation } from '../../../animations/dialog.animation';
import { DialogFormController } from '../../../models/dialog-form-controller';
import { JoinService } from '../../../services/join.service';
import { InputValidatorService } from '../../../services/input-validator.service';
import { DateFormatterService } from '../../../services/date-formatter.service';
import { BoardService } from '../../../services/board.service';
import { JoinButton } from '../../../models/join-button';
import { Task } from '../../../models/task';
import { getCurrentValue, stopPropagation } from '../../../ts/global';

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
  animations: [dialogAnimation],
})

/**
 * Class representing an edit-task dialog component.
 * @extends FormController
 * @implements {OnChanges}
 */
export class EditTaskDialogComponent
  extends DialogFormController
  implements OnChanges
{
  join: JoinService = inject(JoinService);
  validators: InputValidatorService = inject(InputValidatorService);
  dateFormatter: DateFormatterService = inject(DateFormatterService);
  board: BoardService = inject(BoardService);

  calendar: AbstractControl | null = null;
  search: AbstractControl | null = null;
  subtask: AbstractControl | null = null;
  okBtn = new JoinButton('createBtn', 'Ok');

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
    let task = getCurrentValue<Task>(changes, 'task');
    this.updateForm(task);
    this.updateCalendar(task.dueDate);
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
    let date = this.dateFormatter.getCalendarDate(dueDate);
    this.calendar?.setValue(date);
  }

  /**
   * Initializes an edit-task component.
   */
  ngOnInit() {
    this.setForm();
    this.setOkBtn();
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
    this.registerControl('dueDate', '', this.validators.getDueDate());
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

  /**
   * Sets an ok button.
   */
  setOkBtn() {
    this.okBtn.buttonClass += ' ok-btn';
  }

  /**
   * Closes a dialog on close.
   */
  onClose() {
    this.close();
    this.dialog.close('viewTask');
    this.board.setDefaultTask();
    this.resetAssistantControls();
  }

  /**
   * Resets all assistant controls.
   */
  resetAssistantControls() {
    this.calendar?.reset('');
    this.search?.reset('');
    this.subtask?.reset('');
  }

  /**
   * Closes a drop-down menu on click.
   * @param event - The event.
   */
  onMenuClose(event: Event): void {
    this.dialog.resetAssignedTo();
    this.dialog.close('category');
    stopPropagation(event);
  }

  /**
   * Verifies the incompleteness of a form.
   * @returns A boolean value.
   */
  isIncomplete() {
    return this.form.invalid;
  }

  /**
   * Updates a board task on click.
   */
  onUpdate() {
    if (this.form.valid) {
      this.updateTask();
      this.join.updateSummary();
      this.join.saveUser();
      this.fadeDialogOut();
    }
  }

  /**
   * Updates a board task.
   */
  updateTask() {
    let task = this.getEditedTask();
    this.board.task.set(task);
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

  /**
   * Fades a dialog out.
   */
  fadeDialogOut() {
    this.dialog.fadedOut = true;
    setTimeout(() => {
      this.dialog.close(this.id);
      this.dialog.fadedOut = false;
      this.resetAssistantControls();
    }, 0);
  }
}
