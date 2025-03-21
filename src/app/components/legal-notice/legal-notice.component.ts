import { Component } from '@angular/core';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [JoinTitleComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
})

/**
 * Class representing a legal notice component.
 */
export class LegalNoticeComponent {}
