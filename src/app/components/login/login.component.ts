import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { JoinLogoComponent } from '../../shared/components/join-logo/join-logo.component';
import { LegalLinksComponent } from '../../shared/components/legal-links/legal-links.component';
import { JoinService } from '../../shared/services/join.service';
import { CommonModule, ɵparseCookieValue } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputComponent } from '../../shared/components/input/input.component';
import { User } from '../../shared/models/user';

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
  join: JoinService = inject(JoinService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  emailPat = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
  passwordPat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  user = new User();
  users: User[] = [];
  token: string = '';
  sid: string = '';
  hintText = 'This field is required';
  remembered: boolean = false;

  // add checkbox remember me

  constructor() {}

  async ngOnInit() {
    // redefine getUsers() for return value!!!
    await this.join.getUsers();
    this.users = this.join.users;
    console.log('this users: ', this.users);

    const userToken = this.route.snapshot.paramMap.get('id');
    if (userToken) {
      let temp = this.users.find((u) => u.sid == userToken);
      if (temp) {
        this.user = new User(temp);
        this.user.password = '';
        console.log('found registered user: ', this.user);
      }
      this.token = userToken;
      console.log('user token: ', this.token);
    } else {
      console.log('no token');
    }
  }

  // improve!!!
  redirect() {
    this.router.navigateByUrl('sign-up');
  }

  async onSubmit(ngForm: NgForm) {
    // create session id
    this.join.setSecurityId();
    this.sid = this.join.sid;
    console.log('sid: ', this.sid);

    if (ngForm.form.valid && this.token != '') {
      if (this.user.id) {
        this.user.sid = this.sid;
        await this.join.updateUserProperty('sid', this.user.sid);
        console.log('secondary sid: ', this.user);

        console.log('new user successfully logged in');
        this.router.navigate(['main', this.sid, 'summary']);
      }

      // this.router.navigate(['main', this.token, 'summary']);
    } else if (ngForm.form.valid) {
      let temp = this.users.find((u) => u.email == this.user.email);
      this.user = new User(temp);
      this.user.sid = this.sid;
      if (this.user.id) {
        await this.join.updateUserProperty('sid', this.sid);
        console.log('found user to login: ', this.user);
      }

      console.log('user successfully logged in');
      this.router.navigate(['main', this.sid, 'summary']);
    }
  }

  // double code (4x)!!!
  getCheckbox() {
    return this.remembered ? 'checked' : 'check';
  }

  getSrc() {
    if (this.remembered) {
      return '../../../assets/img/sign-up/checked.png';
    } else {
      return '../../../assets/img/sign-up/check.png';
    }
  }

  remember() {
    this.remembered = !this.remembered ? true : false;
  }

  disable(ngForm: NgForm) {
    return ngForm.form.invalid || !this.remembered;
  }
}
