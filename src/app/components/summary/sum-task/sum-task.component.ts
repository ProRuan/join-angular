import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SumCardMediumComponent } from '../sum-card-medium/sum-card-medium.component';
import { SumCardLargeComponent } from '../sum-card-large/sum-card-large.component';
import { SumCardSmallComponent } from '../sum-card-small/sum-card-small.component';

@Component({
  selector: 'app-sum-task',
  standalone: true,
  imports: [
    CommonModule,
    SumCardMediumComponent,
    SumCardLargeComponent,
    SumCardSmallComponent,
  ],
  templateUrl: './sum-task.component.html',
  styleUrl: './sum-task.component.scss',
})
export class SumTaskComponent {
  @Input() type: string = '';
  @Input() task: any;
}
