import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogComponent } from './shared/components/log/log.component';
import { Firestore } from '@angular/fire/firestore';
import { JoinService } from './shared/services/join.service';
import { LogService } from './shared/services/log.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { unsubscribe } from './shared/ts/global';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

/**
 * Class representing an app component.
 */
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  join: JoinService = inject(JoinService);
  log: LogService = inject(LogService);

  title = 'join';
  bodySubscription: Subscription | null = null;
  resizeSubscription: Subscription | null = null;

  /**
   * Initializes an app component.
   */
  ngOnInit(): void {
    this.bodySubscription = this.getBodySubscription();
    this.resizeSubscription = this.getResizeSubscription();
  }

  /**
   * Gets a body subscription.
   * @returns The body subscription.
   */
  getBodySubscription() {
    return this.join.overflowY$.subscribe({
      next: (value) => (document.body.style.overflowY = value),
      error: (error) => console.log('error: ', error),
    });
  }

  /**
   * Gets a resize subscription.
   * @returns The resize subscription.
   */
  getResizeSubscription() {
    let event = this.getResizeEvent();
    let value = this.getWindowWidth(event);
    return this.getSubscription(value);
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
    return number.subscribe((value) => this.join.setWindowWidth(value));
  }

  /**
   * Destroys an app component.
   */
  ngOnDestroy(): void {
    unsubscribe(this.bodySubscription);
    unsubscribe(this.resizeSubscription);
  }
}
