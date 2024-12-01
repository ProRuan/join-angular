import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { JoinService } from '../../shared/services/join.service';
import { Summary } from '../../shared/models/summary';
import { User } from '../../shared/models/user';

// verify (above)!!!
import { SumCardMediumComponent } from './sum-card-medium/sum-card-medium.component';
import { SumCardLargeComponent } from './sum-card-large/sum-card-large.component';
import { SumCardSmallComponent } from './sum-card-small/sum-card-small.component';
import { SummaryService } from '../../shared/services/summary.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CommonModule,
    SumCardMediumComponent,
    SumCardLargeComponent,
    SumCardSmallComponent,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);
  join: JoinService = inject(JoinService);
  summary: SummaryService = inject(SummaryService);

  
  // user localStorage or sessionStorage to avoid reload blinking!?!
  // https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/

  constructor() {}

  get user() {
    return this.join.user;
  }

  ngOnInit() {
    if (this.join.user.email !== undefined) {
      console.log('summary user: ', this.join.user);
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
