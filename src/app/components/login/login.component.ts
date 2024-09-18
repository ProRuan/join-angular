import { Component, inject } from '@angular/core';
import { JoinLogoComponent } from '../../shared/components/join-logo/join-logo.component';
import { LegalLinksComponent } from '../../shared/components/legal-links/legal-links.component';
import { JoinService } from '../../shared/services/join.service';
import { CommonModule, ɵparseCookieValue } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskSummary } from '../../models/task-summary';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [JoinLogoComponent, LegalLinksComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  joinData: JoinService = inject(JoinService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  emailPat = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
  passwordPat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  user = new User();
  token: string = '';

  async ngOnInit() {
    const userToken = this.route.snapshot.paramMap.get('id');
    console.log('login user token: ', userToken);
    if (userToken) {
      const newUser = await this.joinData.getUser(userToken);
      // console.log('new user: ', newUser);
      this.user.id = userToken;
      this.user.name = newUser.name;
      this.user.email = newUser.email;
      this.user.password = newUser.password;
      // this.user.password = '*********';
      this.token = userToken;
    }

    // let tempUser = await this.joinData.getUser();
    // this.user.email = tempUser.email;
    // this.user.password = tempUser.password;
    // console.log('init login: ', tempUser);
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
