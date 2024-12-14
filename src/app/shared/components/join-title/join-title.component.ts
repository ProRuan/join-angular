import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-join-title',
  standalone: true,
  imports: [],
  templateUrl: './join-title.component.html',
  styleUrl: './join-title.component.scss',
})

/**
 * Represents a join title component.
 */
export class JoinTitleComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
