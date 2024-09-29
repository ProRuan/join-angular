import { Component, inject, Input } from '@angular/core';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { MainComponent } from '../main/main.component';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { DraggableTaskComponent } from './draggable-task/draggable-task.component';
import { DialogAddTaskService } from '../../shared/services/dialog-add-task.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [EditTaskComponent, CommonModule, DraggableTaskComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  mainComponent: MainComponent = inject(MainComponent);
  datData: DialogAddTaskService = inject(DialogAddTaskService);

  filter: string = '';
  currTask: any;
  user: User = new User();

  draggableTasks = [
    {
      column: 'in-progress',
      category: 'User Story',
      title: 'Kochwelt Page & Recipe Recommender',
      description: 'Build start page with recipe recommendation...',
      subtaskCounter: 1,
      subtasks: 2,
      assignedContacts: [
        { bgc: '#9327ff', initials: 'AS' },
        { bgc: '#fc71ff', initials: 'DE' },
        { bgc: '#ffbb2b', initials: 'EF' },
      ],
      prio: 'medium',
    },
    {
      column: 'done',
      category: 'Technical Task',
      title: 'Kochwelt Page & Recipe Recommender',
      description: 'Build start page with recipe recommendation...',
      subtaskCounter: 1,
      subtasks: 2,
      assignedContacts: [
        { bgc: '#9327ff', initials: 'AS' },
        { bgc: '#fc71ff', initials: 'DE' },
        { bgc: '#ffbb2b', initials: 'EF' },
      ],
      prio: 'medium',
    },
  ];

  async ngOnInit() {
    await this.mainComponent.ngOnInit();
    this.user = this.mainComponent.user;
    console.log('from main user: ', this.mainComponent.user);
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
}
