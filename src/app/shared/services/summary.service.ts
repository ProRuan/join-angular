import { inject, Injectable } from '@angular/core';
import { JoinService } from './join.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  joinData: JoinService = inject(JoinService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  user = new User();

  async ngOnInit() {
    const userToken = this.route.snapshot.params['id2'];
    console.log('user token: ', userToken);
    if (userToken) {
      const newUser = await this.joinData.getUser(userToken);
      console.log('new user: ', newUser);
      this.user.email = newUser.email;
      this.user.password = newUser.password;
      // this.user.password = '*********';
    }
  }
}
