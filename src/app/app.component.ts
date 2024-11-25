import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { JoinService } from './shared/services/join.service';
import { LogComponent } from './shared/components/log/log.component';
import { LogService } from './shared/services/log.service';

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

  title = 'join';

  join: JoinService = inject(JoinService);
}
