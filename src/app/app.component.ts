import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { JoinService } from './shared/services/join.service';
import { LogComponent } from './shared/components/log/log.component';
import { LogService } from './shared/services/log.service';
// testing!!!
import { fromEvent, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  collection,
  Firestore,
  onSnapshot,
  Unsubscribe,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

// verify!!!
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  log: LogService = inject(LogService);

  // set respWidth for desktop, tablet and mobile ... (1/3)

  // try delay without subscribed collection ...
  // try delay withoud saveUser() ...
  // subscribe logged user ...
  // save logged id ...
  // subscribe valueChanges ...s

  title = 'join';

  join: JoinService = inject(JoinService);

  resizeSubscription!: Subscription;

  ngOnInit(): void {
    let test = this.join.overflowY$.subscribe({
      next: (value) => (document.body.style.overflowY = value),
      error: (error) => console.log('error: ', error),
      complete: () => console.log('complete'),
    });
    // test.unsubscribe();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        map(() => window.innerWidth),
        startWith(window.innerWidth) // Emit the initial width value
      )
      .subscribe((width) => {
        this.join.setWindowWidth(width);
      });

    // const startTime = new Date().getTime();
    // console.log('start time: ', startTime);
    // this.join.subscribeUserCollection();
    // const endTime = new Date().getTime();
    // console.log('time diff: ', endTime - startTime);
    // setTimeout(() => {
    //   this.join.unsubscribeUserCollection();
    //   console.log('user collection unsubscribed');
    // }, 5000);
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
