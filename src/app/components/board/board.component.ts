import { Component, inject, Input } from '@angular/core';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { MainComponent } from '../main/main.component';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { DraggableTaskComponent } from './draggable-task/draggable-task.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [EditTaskComponent, CommonModule, DraggableTaskComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  mainComponent: MainComponent = inject(MainComponent);

  currIndex: number = 0;
  user: User = new User();

  draggableTasks = [
    {
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

  tasks = [
    {
      id: 0,
      title: 'Frontend',
      category: 'to-do',
    },
    {
      id: 1,
      title: 'Backend',
      category: 'in-progress',
    },
  ];

  async ngOnInit() {
    await this.mainComponent.ngOnInit();
    this.user = this.mainComponent.user;
    console.log('from main user: ', this.mainComponent.user);
  }

  // startDrag(i: number) {
  //   this.currIndex = i;
  //   console.log('currIndex: ', this.currIndex);
  // }

  moveTo(category: string) {
    // this.currDragElem.category = category;
    this.tasks[this.currIndex].category = category;
    console.log('tasks: ', this.tasks);
  }

  drop(event: Event) {
    event.preventDefault();
  }
}
