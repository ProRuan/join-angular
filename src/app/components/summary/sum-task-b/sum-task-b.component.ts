import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sum-task-b',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sum-task-b.component.html',
  styleUrl: './sum-task-b.component.scss',
})
export class SumTaskBComponent {
  urgent: number = 1;
  deadline: string = '16 Oktober, 2024';
}
