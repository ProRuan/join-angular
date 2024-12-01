import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SumATaskComponent } from '../sum-a-task/sum-a-task.component';
import { SumBTaskComponent } from '../sum-b-task/sum-b-task.component';
import { SumCTaskComponent } from '../sum-c-task/sum-c-task.component';

@Component({
  selector: 'app-sum-task',
  standalone: true,
  imports: [
    CommonModule,
    SumATaskComponent,
    SumBTaskComponent,
    SumCTaskComponent,
  ],
  templateUrl: './sum-task.component.html',
  styleUrl: './sum-task.component.scss',
})
export class SumTaskComponent {
  @Input() type: string = '';
  @Input() task: any;
}
