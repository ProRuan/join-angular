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
  greeting: string = 'Good morning';
  summary: Summary = new Summary();

  /**
   * Initializes a summary component.
   */
  ngOnInit() {
    this.summary = this.join.user.summary;
    this.greeting = this.getGreeting();
  }

  /**
   * Gets a greeting depending on daytime.
   * @returns The greeting.
   */
  getGreeting() {
    let hours = this.getHours();
    if (hours < 6) return 'Good night';
    else if (hours < 9) return 'Good morning';
    else if (hours < 12) return 'Hello';
    else if (hours < 17) return 'Good afternoon';
    else return 'Good evening';
  }

  /**
   * Gets hours from the current date.
   * @returns The hours from the current date.
   */
  getHours() {
    return new Date().getHours();
  }
}
