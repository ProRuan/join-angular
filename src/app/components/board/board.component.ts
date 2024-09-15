import { Component } from '@angular/core';
import { EditTaskComponent } from './edit-task/edit-task.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [EditTaskComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {}
