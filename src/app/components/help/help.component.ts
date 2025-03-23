import { Component } from '@angular/core';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [JoinTitleComponent],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss',
})

/**
 * Class representing a help component.
 */
export class HelpComponent {}
