import { Component, inject, Input } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { CommonModule } from '@angular/common';
import { DraggableTaskComponent } from './draggable-task/draggable-task.component';
import { DialogAddTaskService } from '../../shared/services/dialog-add-task.service';
import { DialogViewTaskService } from '../../shared/services/dialog-view-task.service';
// import { User } from '../../shared/models/user';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DraggableTaskComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  mainComponent: MainComponent = inject(MainComponent);
  datData: DialogAddTaskService = inject(DialogAddTaskService);
  dvtData: DialogViewTaskService = inject(DialogViewTaskService);

  filter: string = '';
  currTask: any;
  // user: User = new User();

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

  async ngOnInit() {
    // await this.mainComponent.ngOnInit();
    // this.user = this.mainComponent.user;
    // console.log('from main user: ', this.mainComponent.user);
  }

  filterTasks(input: HTMLInputElement) {
    this.filter = input.value;
  }

  // consider case of column placeholder!!!
  verifyTasks(task: any, column: string) {
    let columnMatched = task.column == column;
    let titleMatched = task.title.includes(this.filter);
    let descriptionMatched = task.description.includes(this.filter);
    return columnMatched && (titleMatched || descriptionMatched);
  }

  printPlaceholder(column: string) {
    let tasks = this.draggableTasks.some((t) => t.column == column);
    return !tasks ? true : false;
  }

  logDrag(event: any) {
    this.currTask = event;
    console.log('log drag: ', this.currTask);
    // console.log('log draggable tasks: ', this.draggableTasks);
  }

  // startDrag(i: number) {
  //   this.currIndex = i;
  //   console.log('currIndex: ', this.currIndex);
  // }

  moveTo(category: string) {
    this.currTask.column = category;
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
