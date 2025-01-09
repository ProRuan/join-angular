import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { TitleInputComponent } from '../../shared/components/title-input/title-input.component';
import { DescriptionInputComponent } from '../../shared/components/description-input/description-input.component';
import { AssignedToInputComponent } from '../../shared/components/assigned-to-input/assigned-to-input.component';
import { DueDateInputComponent } from '../../shared/components/due-date-input/due-date-input.component';
import { PrioInputComponent } from '../../shared/components/prio-input/prio-input.component';
import { CategoryInputComponent } from '../../shared/components/category-input/category-input.component';
import { SubtasksInputComponent } from '../../shared/components/subtasks-input/subtasks-input.component';
import { JoinService } from '../../shared/services/join.service';
import { DialogService } from '../../shared/services/dialog.service';
import { Task } from '../../shared/models/task';
import { Contact } from '../../shared/models/contact';
import { Subtask } from '../../shared/models/subtask';
import { getObjectArray, loadUser } from '../../shared/ts/global';
import { SummaryTask } from '../../shared/models/summary-task';
import { Summary } from '../../shared/models/summary';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    JoinTitleComponent,
    TitleInputComponent,
    DescriptionInputComponent,
    AssignedToInputComponent,
    DueDateInputComponent,
    PrioInputComponent,
    CategoryInputComponent,
    SubtasksInputComponent,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})

/**
 * Represents an add-task component.
 */
export class AddTaskComponent {
  join: JoinService = inject(JoinService);
  dialog: DialogService = inject(DialogService);

  title: string = 'Add Task';
  task: Task = new Task();
  defaultTask: Task = new Task(this.task);
  assignedContacts: Contact[] = [];

  get contacts() {
    return this.join.user.contacts;
  }

  set contacts(contacts: Contact[]) {
    this.join.user.contacts = contacts;
  }

  // assigned-to input component
  // ---------------------------
  // 2. Reset assign-to form ... !
  // *. board task: (contact.assigned &&) contact.tasks.includes(this.task)

  // CategoryInputComponent
  // ----------------------
  // set transition of all inputs (especially drop-down menu)!!!!

  // move add-task input to add-task ... !
  // clean add-task component ...

  // SubtasksInputComponent
  // ----------------------
  // plus Style
  // ----------
  // position:absolute, because height is changing + stop(event)!!!
  // set subtask cont height limit?!

  // getObject() + taskRef/contactsRef ... ?! (1/2)

  // --------------------------------------------------------------

  // BoardComponent
  // --------------
  // create sample tasks ... !
  // update summary tasks ... !

  // onFocus and onBlur OR onFocusChange: verfiy event type?!F

  ngOnInit() {
    this.loadUser();
    console.log('add task user: ', this.join.user);

    // let date = new Date();
    // console.log('date: ', date);
    // // to string
    // console.log('date to date string: ', date.toDateString());
    // console.log('date to ISO string: ', date.toISOString());
    // console.log('date to json: ', date.toJSON());
    // console.log('date to locale date string: ', date.toLocaleDateString());
    // console.log('date to locale time string: ', date.toLocaleTimeString());
    // console.log('date to string: ', date.toString());
    // console.log('date to time string: ', date.toTimeString());
    // console.log('date to UTC string: ', date.toUTCString());
    // // get
    // console.log('date get date: ', date.getDate());
    // console.log('date get day: ', date.getDay());
    // console.log('date get full year: ', date.getFullYear());
    // console.log('date get hours: ', date.getHours());
    // console.log('date get ms: ', date.getMilliseconds());
    // console.log('date get min: ', date.getMinutes());
    // console.log('date get month: ', date.getMonth());
    // console.log('date get sec: ', date.getSeconds());
    // console.log('date get time: ', date.getTime());
    // console.log('date get tz offset: ', date.getTimezoneOffset());
    // console.log('date get utc date: ', date.getUTCDate());
    // console.log('date get utc day: ', date.getUTCDay());
    // console.log('date get utc full year: ', date.getUTCFullYear());
    // console.log('date get utc hours: ', date.getUTCHours());
    // console.log('date get utc ms: ', date.getUTCMilliseconds());
    // console.log('date get utc min: ', date.getUTCMinutes());
    // console.log('date get utc month: ', date.getUTCMonth());
    // console.log('date get utc sec: ', date.getUTCSeconds());
    // // create again
    // console.log('date again: ', new Date(date.getTime()));

    // if (this.join.user.email !== undefined) {
    //   console.log('add task user: ', this.join.user);
    // }
  }

  loadUser() {
    let user = loadUser();
    if (user) {
      this.join.user = user;
      // console.log('user summary: ', this.join.user.summary instanceof Summary); // check
      // console.log('user summary tasks: ', this.join.user.summary.urgent instanceof SummaryTask); // check
      console.log('user tasks: ', this.join.user.tasks instanceof Array);
      console.log('user task: ', this.join.user.tasks[0] instanceof Task);
      console.log('user contacts: ', this.join.user.contacts instanceof Array);
      console.log(
        'user contact: ',
        this.join.user.contacts[0] instanceof Contact
      );
    }
  }

  onResetForm(ngForm: NgForm) {
    // [date] + resetForm() + setTimeout() + set _date() ...
    this.task = new Task();
    // ngForm.reset();

    // reset due date ...
    //   - summary update ...
    //   - form builder + assignedTo filter + date value + subtask input value ...
    //   - ControlValueAccessor ...
    //   - DefaultTask ...
    //   - two-way-binding and output or exchange value and date ...
    //   - input [config]="config" as shortcut ... ?
    //   - input [date]="date" --> give date, date string or date number ...
    //   - input [filter], [date] and [add] ...
    // reset assigntTo input ... !
    // reset subtask input ... !
  }

  isDisabled() {
    // ngForm.reset for inputs!?!
    return this.task.isDefault();
  }

  // add task to user!!!
  async onAddTask(ngForm: NgForm) {
    if (ngForm.form.valid) {
      console.log('title: ', this.task.title);
      console.log('due date: ', this.task.dueDate);
      console.log('catecory: ', this.task.category);
      this.join.user.tasks.push(this.task);
      console.log('user tasks: ', this.join.user.tasks);
      console.log('submitted task: ', this.task);

      // let convertedUser = this.join.user.getObject();
      // // let summary = this.join.user.summary;
      // console.log('summary: ', convertedUser.summary);

      // await this.join.updateUser(
      //   this.join.user.id,
      //   'data.summary',
      //   convertedUser.summary
      // );

      this.join.user.summary.toDo.amount++;
      this.join.user.summary.inBoard.amount++;
      if (this.task.prio == 'urgent') {
        this.join.user.summary.urgent.amount++;
        this.join.user.summary.urgent.deadline = 'September 2, 2024';
      }

      // keep ids after converting!!!
      let tasks = getObjectArray<Task>(this.join.user.tasks, Task);
      console.log('converted user tasks: ', tasks);

      let convertedUser = this.join.user.getObject(); // not working
      console.log('converted user: ', convertedUser);
      // add task + update summary!!!

      this.task = new Task();
      console.log('task emptied; ', this.task);

      // assignedTo not working yet ...
      // subtasks not working yet ...

      // deletes task after reload --> update user!!!
      await this.join.updateUser(
        this.join.user.id,
        'data.tasks',
        tasks
        // convertedUser.tasks
      );
      await this.join.updateUser(
        this.join.user.id,
        'data.summary',
        this.join.user.summary.getObject()
      );
    } else {
      console.log('form invalid');
    }

    // remove test below!!!
  }

  /**
   * Sets the task property on change.
   * @param key - The key of the task property.
   * @param value - The value to set.
   */
  onSetTask(key: string, value: string | Contact[] | Subtask[]) {
    this.task[key] = value;
    // console.log('task assigned-to test: ', this.task.assignedTo);
    // console.log('task category test: ', this.task.category);
    // console.log('task prio test: ', this.task.prio);
    // console.log('task subtasks test: ', this.task.subtasks);
    console.log('task due-date test: ', this.task.dueDate);
  }
}
