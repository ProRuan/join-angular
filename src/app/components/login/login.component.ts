import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import { User } from '../../shared/models/user';

// verify!!!
import { InputComponent } from '../../shared/components/input/input.component';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LogoComponent,
    FooterComponent,

    // verify!!!
    InputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  user: UserService = inject(UserService);

  sid: string;
  email: string;
  password: string;

  // verify!!!
  emailPat = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
  passwordPat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  token: string = '';
  hintText = 'Check your email and password. Please try again.';
  remembered: boolean = false;

  // add checkbox remember me

  constructor() {
    this.sid = '';
    this.email = '';
    this.password = '';
    // password = '********';
  }

  // set email after getting user!!!
  async ngOnInit() {
    await this.join.getUsers();
    console.log('all join users: ', this.join.users);

    const sid = this.route.snapshot.paramMap.get('id');
    if (sid) {
      // set user via UserService --> get/set user from join!!!
      this.sid = sid;
      let user = this.join.users.find((u) => u.sid == sid);
      if (user) {
        this.email = user.email;
      }
      console.log('new user login: ', user);
    } else {
      console.log('user login');
    }
  }

  // improve!!!
  redirect() {
    this.router.navigateByUrl('sign-up');
  }

  async logIn(ngForm: NgForm) {
    if (ngForm.form.valid) {
      let user = this.join.users.find((u) => this.exists(u));
      if (user) {
        this.join.user = new User(user);
        await this.join.setSecurityId();
        console.log('secondary sid: ', this.user);
      }

      if (this.user.id) {
        this.join.id = this.user.id;
        // set id in join service!!!
      }
      console.log('logged in successfully: ', this.join.user);
      this.join.subscribeUser();
      // subscribe all users as well!!!
      this.router.navigate(['main', this.user.sid, 'summary']);
    }
  }

  // jsdoc
  exists(user: User) {
    return user.email === this.email && user.password === this.password;
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
