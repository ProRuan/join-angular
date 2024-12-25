import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { SumCardComponent } from './sum-card/sum-card.component';
import { loadUser } from '../../shared/ts/global';
import { User } from '../../shared/models/user';
import { Summary } from '../../shared/models/summary';
import { JoinService } from '../../shared/services/join.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, JoinTitleComponent, SumCardComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})

/**
 * Represents a summary component.
 */
export class SummaryComponent {
  join: JoinService = inject(JoinService);

  title: string = 'Join 360';
  subtitle: string = 'Key Metrics at a Glance';
  tasks: Summary = new Summary();

  /**
   * Initializes a summary component.
   */
  ngOnInit() {
    this.loadUserSummary();
  }

  /**
   * Loads the user summary.
   */
  loadUserSummary() {
    let user = loadUser();
    if (user) {
      this.join.user = user;
      this.tasks = this.join.user.summary;
    }
  }
}
