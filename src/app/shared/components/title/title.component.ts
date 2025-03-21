import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})

/**
 * Class representing a title component.
 */
export class TitleComponent {
  @Input() title: string = '';
}
