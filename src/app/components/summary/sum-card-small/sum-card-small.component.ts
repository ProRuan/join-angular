import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sum-card-small',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sum-card-small.component.html',
  styleUrl: './sum-card-small.component.scss',
})

/**
 * Represents a sum-card-small component.
 */
export class SumCardSmallComponent {
  @Input() task = {
    amount: 5,
    category: 'Tasks in Board',
  };
}
