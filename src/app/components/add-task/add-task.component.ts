import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';

// verify!!!
import { FormsModule, NgForm } from '@angular/forms';
import { JoinService } from '../../shared/services/join.service';

// verify!!!
import { PrioButtonComponent } from '../../shared/components/prio-button/prio-button.component';
import { PrioService } from '../../shared/services/prio.service';
import { last } from 'rxjs';
import { SubtaskService } from '../../shared/services/subtask.service';
import { TitleInputComponent } from '../../shared/components/title-input/title-input.component';
import { DescriptionInputComponent } from '../../shared/components/description-input/description-input.component';
import { AssignedToInputComponent } from '../../shared/components/assigned-to-input/assigned-to-input.component';
import { DueDateInputComponent } from '../../shared/components/due-date-input/due-date-input.component';
import { PrioInputComponent } from '../../shared/components/prio-input/prio-input.component';
import { CategoryInputComponent } from '../../shared/components/category-input/category-input.component';
import { SubtasksInputComponent } from '../../shared/components/subtasks-input/subtasks-input.component';
import { DialogService } from '../../shared/services/dialog.service';
import { loadUser } from '../../shared/ts/global';
import { User } from '../../shared/models/user';
import { Task } from '../../shared/models/task';
// import { User } from '../../shared/models/user';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    JoinTitleComponent,
    TitleInputComponent,
    DescriptionInputComponent,
    AssignedToInputComponent,
    DueDateInputComponent,
    PrioInputComponent,
    CategoryInputComponent,
    SubtasksInputComponent,
    FormsModule,
    // PrioButtonComponent,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  dialog: DialogService = inject(DialogService);

  title: string = 'Add Task';
  id: string = 'category';

  // global
  // ------
  // getCapitalized() ...

  // assigned-to input component
  // ---------------------------
  // 1. Update category dialog ...
  // 2. Implement user contacts ...
  // 3. Replace filter witch assignable contacts ...
  //      - double style with category input ... ?
  //      - fix input, type and filter ... (0/3)
  //      - one task can have more than one contacts!
  //      - one contact can have more than one tasks!
  //      - add task id!

  // DueDateInputComponent
  // ---------------------
  // fix input focus ...
  // fix input focus (assigned to) ...
  // fix input error border ...
  // fix input hint ...
  // HintInputComponent ... ?
  // implement validateDate() ...

  // PrioInputComponent
  // ------------------
  // add more space (not visible hint) ...
  // move prio button to piro input ...

  // CategoryInputComponent
  // ----------------------
  // set transition of all inputs (especially drop-down menu)!!!
  // use ngIf for drop down menus!!!
  // add error state and hints to inputs (even empty hints)!!!
  // complete category style!
  // override source functions!
  // improve getSrc() with this.directory ...

  // parent input focus!!!
  // add (You)!!!
  // folder for checkbox images!
  // add (input)="onInputChange($event)"!!!
  // clean all add-task inputs ...
  // combine add-task inputs ... ?
  // combine add-task input styles ... ?
  // move add-task input to add-task ... !
  // clean add-task component ...

  // verify!!!
  join: JoinService = inject(JoinService);
  prioData: PrioService = inject(PrioService);

  user: User = new User();

  // add-task-inputs (1/7)* input component?
  // ---------------
  // 1. TitleInputComponent - check*
  // 2. DescriptionInputComponent - check*
  // 3. AssignedToInputComponent ...

  // verify + rename!!!
  subTData: SubtaskService = inject(SubtaskService);
  sessionToken: string = '';
  codes: string[] = [];

  // verify + rename
  task: any;
  ACListViewed: boolean = true;
  filter: string = '';
  dueDate: any;
  currDate: string = new Date().toLocaleDateString();
  dateInvalid: boolean = false;
  dueDatePat = /([0-3]?[0-9])[\.\/]([0-1]?[0-9])[\.\/]([0-9]{4})/;
  subtask: string = '';
  subtaskFocused: boolean = false;

  // only for testing!!!
  assignableContacts = [
    {
      initials: 'PM',
      bgc: 'cyan',
      name: 'Peter Müller',
      assigned: false,
      filtered: true,
    },
    {
      initials: 'AS',
      bgc: 'purple',
      name: 'Anja Schulz',
      assigned: false,
      filtered: true,
    },
    {
      initials: 'EF',
      bgc: 'yellow',
      name: 'Eva Fischer',
      assigned: false,
      filtered: true,
    },
  ];
  assignedContacts: any;

  // subtasks = [
  //   {
  //     text: 'Contact Form',
  //     done: false,
  //     focused: false,
  //   },
  //   {
  //     text: 'Write Legal Imprint',
  //     done: false,
  //     focused: false,
  //   },
  // ];

  // Please review!!!

  // title - check
  // description - check
  // assignedTo - check
  //   - logged in user 'You' ... (!)
  //   - subId ... ?
  // dueDate - check
  // prio - check
  // category - check
  // subtasks ...

  constructor() {
    this.task = {
      title: '',
      description: '',
      assignedTo: this.assignableContacts,
      // assignedTo: [],
      dueDate: '',
      prio: 'medium',
      category: '',
      subtasks: [],
      column: 'to-do',
    };
  }

  onAssign(contacts: any[]) {
    this.task.assignedTo = contacts;
  }

  // rename to onDateChange()
  onDate(date: string) {
    this.task.dueDate = date;
  }

  // rename to onCategoryChange()
  onCat(category: string) {
    this.task.category = category;
    console.log('this task category: ', this.task.category);
  }

  // load saved user!
  // disable button!
  // write global isDisabled()!

  ngOnInit() {
    this.loadUser();
    console.log('add task user: ', this.user);

    // loadUser or getUser!
    // update user tasks!

    // only for testing!!!
    // -------------------
    // setInterval(() => {
    //   console.log('task title: ', this.task.title);
    //   console.log('task description: ', this.task.description);
    // }, 2000);

    // if (this.join.user.email !== undefined) {
    //   console.log('add task user: ', this.join.user);
    // }
  }

  loadUser() {
    let user = loadUser();
    if (user) {
      this.user = user;
    }
  }

  // get user() {
  //   return this.join.user;
  // }

  // async ngOnInit() {
  //   console.log('got user via join service: ', this.join.user);
  //   if (!this.user.tasks) {
  //     this.user.tasks = [];
  //   }
  //   this.formatCurrDate();
  // }

  resetForm(ngForm: NgForm) {
    ngForm.reset();
    this.prioData.reset();
  }

  // add task to user!!!
  async addTask(ngForm: NgForm) {
    if (ngForm.form.valid) {
      console.log('title: ', this.task.title);
      console.log('due date: ', this.task.dueDate);
      console.log('catecory: ', this.task.category);
      this.user.tasks.push(this.task);
      console.log('user tasks: ', this.user.tasks);
      console.log('submitted task: ', this.task);

      this.task = new Task();
      console.log('task emptied; ', this.task);
    } else {
      console.log('form invalid');
    }
    // if (ngForm.form.valid) {
    //   this.task.assignedTo = this.assignedContacts;
    //   this.task.prio = this.prioData.prio;
    //   this.task.subtasks = this.subTData.subtasks;
    //   if (this.user.id) {
    //     await this.join.updateUserProperty('tasks', JSON.stringify(this.task));
    //     console.log('task created: ', this.task);
    //   }
    //   // check error!!!
    //   // if (this.user.id) {
    //   //   let temp = await this.userData.getUser(this.user.id);
    //   //   console.log('tasks updated: ', JSON.parse(temp.tasks));
    //   // }
    // } else {
    //   console.log('not valid');
    // }
  }
}
