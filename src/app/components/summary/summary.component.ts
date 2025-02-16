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
 * Represents a summary component.
 */
export class SummaryComponent {
  join: JoinService = inject(JoinService);

  // update login and sign-up
  // ------------------------
  // this.email (control) and so on ...
  //   --> udpate login and sign-up ... !

  // registerUser() ...
  // reject(): rename (also for login) ... !!!
  // move log ... ?
  // log reset wrong ... !
  // remember me wrong ... !!!

  // delete nameVal, emailVal, passwordVal and inputVal ... ?!
  // improve extends (like FormController) ...
  // set private methods ...
  // fix matchword validation --> validation on focus (not on dirty) ... ?!
  // 5 input values for inputs ... ?

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
