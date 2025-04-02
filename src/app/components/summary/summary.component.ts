import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { SumCardComponent } from './sum-card/sum-card.component';
import { greetingAnimation } from '../../shared/animations/greeting.animation';
import { JoinService } from '../../shared/services/join.service';
import { Summary } from '../../shared/models/summary';
import { getSessionalItem, setSessionalItem } from '../../shared/ts/global';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, JoinTitleComponent, SumCardComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  animations: [greetingAnimation],
})

/**
 * Class representing a summary component.
 */
export class SummaryComponent {
  join: JoinService = inject(JoinService);

  title: string = 'Join 360';
  subtitle: string = 'Key Metrics at a Glance';
  greeting: string = 'Good morning';
  greetingDone: boolean = false;
  currentSummary: Summary = new Summary();

  /**
   * Gets a user summary.
   * @returns The user summary.
   */
  get summary() {
    return this.join.user.summary;
  }

  /**
   * Sets a user summary.
   * @param value - The summary to set.
   */
  set summary(summary: Summary) {
    this.currentSummary = summary;
  }

  /**
   * Initializes a summary component.
   */
  ngOnInit() {
    this.loadGreetingState();
    this.setSummary();
  }

  /**
   * Loads a greeting state from the session storage.
   */
  loadGreetingState() {
    let greetingDone = getSessionalItem('greetingDone');
    if (greetingDone) {
      this.setDone();
    }
  }

  /**
   * Sets a greeting to done.
   */
  setDone() {
    this.greetingDone = true;
    setSessionalItem('greetingDone', true);
  }

  /**
   * Sets a summary.
   */
  setSummary() {
    this.greeting = this.getGreeting();
    this.summary = this.join.user.summary;
  }

  /**
   * Gets a greeting depending on daytime.
   * @returns The greeting.
   */
  getGreeting() {
    let hours = this.getHours();
    if (hours < 6) return 'Good night';
    if (hours < 9) return 'Good morning';
    if (hours < 12) return 'Hello';
    if (hours < 17) return 'Good afternoon';
    return 'Good evening';
  }

  /**
   * Gets hours from the current date.
   * @returns The hours from the current date.
   */
  getHours() {
    return new Date().getHours();
  }

  /**
   * Gets the style of a greeting animation element.
   * @returns The style of the greeting animation element.
   */
  getStyle() {
    return this.isMobileStyle() ? { display: 'none' } : null;
  }

  /**
   * Verifies a mobile style.
   * @returns A boolean value.
   */
  isMobileStyle() {
    return this.greetingDone && this.join.isMobile();
  }

  /**
   * Verifies the disabled state of a greeting animation.
   * @returns A boolean value.
   */
  isDisabled() {
    return this.greetingDone || !this.join.isMobile();
  }
}
