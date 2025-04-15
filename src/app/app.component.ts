import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { JoinService } from './shared/services/join.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

/**
 * Class representing an app component.
 */
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  join: JoinService = inject(JoinService);

  title = 'join';
  subscriptions = new Subscription();

  /**
   * Initializes an app component.
   */
  ngOnInit(): void {
    this.updateSettings();
    this.updateBodyStyle();
  }

  /**
   * Updates settings.
   */
  updateSettings() {
    let event = this.getResizeEvent();
    let value = this.getWindowWidth(event);
    let sub = this.getSubscription(value);
    this.subscriptions.add(sub);
  }

  /**
   * Gets an observable as resize event.
   * @returns - The observable as resize event.
   */
  getResizeEvent() {
    return fromEvent(window, 'resize');
  }

  /**
   * Gets a window width.
   * @param event - The event.
   * @returns The window width.
   */
  getWindowWidth(event: Observable<Event>) {
    return event.pipe(
      map(() => window.innerWidth),
      startWith(window.innerWidth)
    );
  }

  /**
   * Gets a subscription.
   * @param number - The window width.
   * @returns The subscription.
   */
  getSubscription(number: Observable<number>) {
    return number.subscribe((value) => this.join.updateJoinSettings(value));
  }

  /**
   * Updates a body style.
   */
  updateBodyStyle() {
    this.join.overflowY$.subscribe({
      next: (value) => this.setOverflowY(value),
      error: (error) =>
        console.log('Error - Could not update body style: ', error),
    });
  }

  /**
   * Sets an overflow y value.
   * @param value - The value to set.
   */
  setOverflowY(value: string) {
    document.body.style.overflowY = value;
  }

  /**
   * Destroys an app component.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
