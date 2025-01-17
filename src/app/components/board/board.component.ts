import { Component, inject, Input } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { CommonModule } from '@angular/common';
import { DraggableTaskComponent } from './draggable-task/draggable-task.component';
import { DialogViewTaskService } from '../../shared/services/dialog-view-task.service';
import { JoinService } from '../../shared/services/join.service';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { ButtonData } from '../../shared/interfaces/button-data';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { DialogService } from '../../shared/services/dialog.service';
import { SearchInputComponent } from './search-input/search-input.component';
import { FormsModule } from '@angular/forms';
import { ColumnComponent } from './column/column.component';
import { BoardService } from '../../shared/services/board.service';
import { Task } from '../../shared/models/task';
// import { User } from '../../shared/models/user';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    JoinTitleComponent,
    ButtonComponent,
    SearchInputComponent,
    ColumnComponent,
    // DraggableTaskComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  join: JoinService = inject(JoinService);
  board: BoardService = inject(BoardService);
  dialog: DialogService = inject(DialogService);

  // Board Component
  // ---------------
  // check dialog-add-task + rename ... ?
  // activate save on drop method (colum component) ... !
  // verify and fix task and board ids ... !
  // rename draggable task to drag card ... ?

  // Column Component
  // ----------------
  // fix feedback style on drop on main component ... !
  // disable non-neighbor column ... ?
  // check onUpdateTask() --> summary (in-progress, await-feedback) ... !!!
  //   --> match summary, task and column ids ... (0/3)

  // Draggable-Task Component
  // ------------------------
  // add onViewTask method ... !
  // global classes 'user-story' and 'technical-task' ...
  // cut to long descriptions ...

  // subtasks test (only for testing)
  // -------------
  //  for (let i = 0; i < this.task.subtasks.length - 1; i++) {
  //   let subtask = this.task.subtasks[i];
  //   subtask.done = true;
  // }
  // ---------

  // Board Service
  // -------------
  // readonly subcribeUser constant ... ?

  // verify!!!
  mainComponent: MainComponent = inject(MainComponent);
  dvtData: DialogViewTaskService = inject(DialogViewTaskService);

  title: string = 'Board';

  addTaskBtn: ButtonData = {
    buttonClass: 'create-btn slim',
    contClass: 'cont-92',
    textClass: 'create-btn-text',
    text: 'Add task',
    imgClass: 'img-32',
    src: '/assets/img/board/add.png',
    alt: 'add',
  };

  draggableTasks = [
    {
      column: 'in-progress',
      category: 'User Story',
      title: 'Kochwelt Page & Recipe Recommender',
      description: 'Build start page with recipe recommendation...',
      dueDate: '10/05/2023',
      subtaskCounter: 1,
      subtasks: 2,
      assignedContacts: [
        { bgc: '#9327ff', initials: 'AS', name: 'Anja Schulz' },
        { bgc: '#fc71ff', initials: 'DE', name: 'David Eisenberg' },
        { bgc: '#ffbb2b', initials: 'EF', name: 'Eva Fischer' },
      ],
      prio: 'medium',
    },
    {
      column: 'done',
      category: 'Technical Task',
      title: 'Kochwelt Page & Recipe Recommender',
      description: 'Build start page with recipe recommendation...',
      dueDate: '10/05/2023',
      subtaskCounter: 1,
      subtasks: 2,
      assignedContacts: [
        { bgc: '#9327ff', initials: 'AS', name: 'Anja Schulz' },
        { bgc: '#fc71ff', initials: 'DE', name: 'David Eisenberg' },
        { bgc: '#ffbb2b', initials: 'EF', name: 'Eva Fischer' },
      ],
      prio: 'medium',
    },
  ];

  get filter() {
    return this.board.filter;
  }

  set filter(value: string) {
    this.board.filter = value;
  }

  get tasks() {
    return this.join.user.tasks;
  }

  set tasks(tasks: Task[]) {
    this.join.user.tasks = tasks;
  }

  async ngOnInit() {
    await this.join.loadUser();
    this.join.subscribeUser();
  }

  // jsdoc
  addTask() {
    this.dialog.open('addTask');
  }

  getTasks(column: string) {
    return this.tasks.filter((t) => t.column == column);
  }

  // consider case of column placeholder!!!
  verifyTasks(task: any, column: string) {
    let columnMatched = task.column == column;
    let titleLowerCase = task.title.toLowerCase();
    let titleMatched = titleLowerCase.includes(this.filter);
    let descriptionToLowerCase = task.description.toLowerCase();
    let descriptionMatched = descriptionToLowerCase.includes(this.filter);
    return columnMatched && (titleMatched || descriptionMatched);
  }

  printPlaceholder(column: string) {
    let tasks = this.draggableTasks.some((t) => t.column == column);
    return !tasks ? true : false;
  }

  drop(event: Event) {
    event.preventDefault();
  }

  viewTask(event: any) {
    let task = event;
    console.log('view Task: ', task);

    this.dvtData.set(task);
    console.log('set task to view: ', this.dvtData.task);
    this.dvtData.open();
  }
}
