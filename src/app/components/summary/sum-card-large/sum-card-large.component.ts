import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sum-card-large',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sum-card-large.component.html',
  styleUrl: './sum-card-large.component.scss',
})

/**
 * Represents a sum-card-large component.
 */
export class SumCardLargeComponent {
  @Input() task = {
    urgent: 1,
    deadline: 'October 16, 2024',
  };
}
