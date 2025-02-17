import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { SumCardComponent } from './sum-card/sum-card.component';
import { JoinService } from '../../shared/services/join.service';
import { Summary } from '../../shared/models/summary';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, JoinTitleComponent, SumCardComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})

/**
 * Class representing a summary component.
 */
export class SummaryComponent {
  join: JoinService = inject(JoinService);

  title: string = 'Join 360';
  subtitle: string = 'Key Metrics at a Glance';
  summary: Summary = new Summary();

  /**
   * Initializes a summary component.
   */
  async ngOnInit() {
    this.summary = this.join.user.summary;
  }
}
