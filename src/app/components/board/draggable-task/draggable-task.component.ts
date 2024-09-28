import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-draggable-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-task.component.html',
  styleUrl: './draggable-task.component.scss',
})
export class DraggableTaskComponent {
  @Input() task = {
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
  };

  color() {
    let color = this.task.category.toLowerCase();
    return color.replace(' ', '-');
  }
}
