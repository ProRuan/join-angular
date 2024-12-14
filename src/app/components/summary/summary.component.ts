import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// verify route and router!!!
import { ActivatedRoute, Router } from '@angular/router';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { SumCardComponent } from './sum-card/sum-card.component';
import { Firestore } from '@angular/fire/firestore';
import { JoinService } from '../../shared/services/join.service';
import { Summary } from '../../shared/models/summary';
import { User } from '../../shared/models/user';

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
  // verify route and router!!!
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);
  join: JoinService = inject(JoinService);

  title: string = 'Join 360';
  subtitle: string = 'Key Metrics at a Glance';

  // improve user!!!
  user: User = new User('');
  tasks: Summary = new Summary();

  // user localStorage or sessionStorage to avoid reload blinking!?!
  // https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/

  // save user summary at local storage (until log out)!!!
  ngOnInit() {
    this.user = this.join.user;
    if (this.user.email !== undefined) {
      console.log('summary user: ', this.user);

      // add default summary to user (at the login or the summary?)
      this.tasks = this.user.summary;
    }
  }

  // remove or reactivate!!!
  // -----------------------
  // // jsdoc
  // get user() {
  //   return this.join.user;
  // }

  // // jsdoc
  // get summary() {
  //   if (this.user.summary) {
  //     return this.user.summary;
  //   } else {
  //     return new Summary();
  //   }
  // }

  // // jsdoc
  // async ngOnInit() {
  //   await this.addSummary();
  // }

  // // jsdoc + necessary?
  // async addSummary() {
  //   if (!this.user.summary) {
  //     this.user.summary = new Summary();
  //     await this.join.updateUserProperty('summary', this.user.summary);
  //   }
  // }
}
