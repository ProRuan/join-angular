import { Component } from '@angular/core';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { BackArrowButtonComponent } from '../../shared/components/back-arrow-button/back-arrow-button.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [JoinTitleComponent, BackArrowButtonComponent],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss',
})

/**
 * Class representing a help component.
 */
export class HelpComponent {}
