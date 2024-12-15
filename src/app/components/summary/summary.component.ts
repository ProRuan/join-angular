import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { SumCardComponent } from './sum-card/sum-card.component';
import { loadUser } from '../../shared/ts/global';
import { User } from '../../shared/models/user';
import { Summary } from '../../shared/models/summary';

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
  title: string = 'Join 360';
  subtitle: string = 'Key Metrics at a Glance';
  user: User = new User('');
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
      this.user = user;
      this.tasks = this.user.summary;
    }
  }
}
