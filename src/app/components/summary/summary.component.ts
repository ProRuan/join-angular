import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// verify route and router!!!
import { ActivatedRoute, Router } from '@angular/router';
import { JoinTitleComponent } from '../../shared/components/join-title/join-title.component';
import { SumCardComponent } from './sum-card/sum-card.component';
import { Firestore } from '@angular/fire/firestore';
import { JoinService } from '../../shared/services/join.service';
import { loadUser } from '../../shared/ts/global';
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

  // logo animation time
  // MainComponent
  // LogoutComponent --> Logout via JoinHeaderComponent!!!
  // SummaryComponent (ThisComponent)

  // improve user!!!
  user: User = new User('');
  tasks: Summary = new Summary();

  // https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/

  // save user summary at local storage (until log out)!!!
  ngOnInit() {
    this.loadUserSummary();
  }

  loadUserSummary() {
    let user = loadUser();
    if (user) {
      this.user = user;
      this.tasks = this.user.summary;
    }
  }
}
