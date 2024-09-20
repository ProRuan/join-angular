import { Component, inject } from '@angular/core';
import { JoinLogoComponent } from '../../shared/components/join-logo/join-logo.component';
import { LegalLinksComponent } from '../../shared/components/legal-links/legal-links.component';
import { JoinService } from '../../shared/services/join.service';
import { CommonModule, ɵparseCookieValue } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskSummary } from '../../models/task-summary';
import { InputComponent } from '../../shared/components/input/input.component';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    JoinLogoComponent,
    LegalLinksComponent,
    CommonModule,
    FormsModule,
    InputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  joinData: JoinService = inject(JoinService);
  userData: UserService = inject(UserService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  emailPat = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
  passwordPat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  user = new User();
  token: string = '';
  hintText = 'This field is required';

  async ngOnInit() {
    await this.userData.getUsers();
    let users = this.userData.users;
    const userToken = this.route.snapshot.paramMap.get('id');
    console.log('login user token: ', userToken);
    if (userToken) {
      let user = users.find((u) => u.sid == userToken);
      if (user) {
        console.log('found user by sid: ', user);
        this.user = new User(user);
      }

      // // this.user.password = '*********';
      this.token = userToken;
    }
  }

  // improve!!!
  redirect() {
    this.router.navigateByUrl('sign-up');
  }

  onSubmit(ngForm: NgForm) {
    let verifiedUser = this.joinData.users.find(
      (u) => u.email == this.user.email && u.password == this.user.password
    );
    if (ngForm.form.valid && verifiedUser && this.token) {
      console.log('user successfully logged in');
      // console.log('user task summary: ', this.user.taskSummary);

      this.joinData.currUser = this.user;

      this.router.navigate(['main', this.token, 'summary']);
      // this.router.navigate(['main', this.token, 'add-task']);
      // this.router.navigate(['main', this.token, 'board']);
      // this.router.navigate(['main', this.token, 'contacts']);
    } else if (ngForm.form.valid && verifiedUser) {
      console.log('user successfully logged in');
      // create session token!!!
      // console.log('user task summary: ', this.user.taskSummary);

      this.joinData.currUser = this.user;
      this.token = verifiedUser.id;
      this.router.navigate(['main', this.token, 'summary']);
      // this.router.navigate(['main', this.token, 'add-task']);
      // this.router.navigate(['main', this.token, 'board']);
      // this.router.navigate(['main', this.token, 'contacts']);
    }
  }
}
