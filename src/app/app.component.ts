import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { JoinService } from './shared/services/join.service';
import { LogComponent } from './shared/components/log/log.component';
import { LogService } from './shared/services/log.service';
// testing!!!
import { fromEvent, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

// verify!!!
export class AppComponent {
  log: LogService = inject(LogService);

  // set respWidth for desktop, tablet and mobile ... (1/3)

  title = 'join';

  join: JoinService = inject(JoinService);

  resizeSubscription!: Subscription;

  ngOnInit(): void {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        map(() => window.innerWidth),
        startWith(window.innerWidth) // Emit the initial width value
      )
      .subscribe((width) => {
        this.join.setWindowWidth(width);
      });
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
