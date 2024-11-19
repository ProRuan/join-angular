import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { IntroHeaderComponent } from '../../shared/components/intro-header/intro-header.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LogoComponent,
    IntroHeaderComponent,
    TitleComponent,
    CheckboxComponent,
    FooterComponent,

    // verify!!!
    // routerlink?!
    TextInputComponent,
    PasswordInputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

/**
 * Represents a login component.
 */
export class LoginComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  // user: UserService = inject(UserService);

  // rename functions (see: sign-up)!
  // check email hint!
  // check password hint!
  // app-login-header?

  sid: string;
  email: string;
  password: string;

  // verify!!!
  emailPat = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
  passwordPat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  token: string = '';
  hint = 'Check your email and password. Please try again.';
  remembered: boolean = false;
  loggedIn: boolean = false;

  // add checkbox remember me

  constructor() {
    this.sid = '';
    this.email = '';
    this.password = '';
    // password = '********';
  }

  // set email after getting user!!!
  async ngOnInit() {
    // await this.join.getUsers();
    // console.log('all join users: ', this.join.users);
    // const sid = this.route.snapshot.paramMap.get('id');
    // if (sid) {
    //   // set user via UserService --> get/set user from join!!!
    //   this.sid = sid;
    //   let user = this.join.users.find((u) => u.sid == sid);
    //   if (user) {
    //     this.email = user.email;
    //   }
    //   console.log('new user login: ', user);
    // } else {
    //   console.log('user login');
    // }
  }

  async logIn(ngForm: NgForm) {
    // if (ngForm.form.valid) {
    //   let user = this.join.users.find((u) => this.exists(u));
    //   if (user) {
    //     this.join.user = new User(user);
    //     await this.join.setSecurityId();
    //     console.log('secondary sid: ', this.user);
    //   }
    //   if (this.user.id) {
    //     this.join.id = this.user.id;
    //     // set id in join service!!!
    //   }
    //   console.log('logged in successfully: ', this.join.user);
    //   this.join.subscribeUser();
    //   // subscribe all users as well!!!
    //   this.router.navigate(['main', this.user.sid, 'summary']);
    // }
  }

  // // jsdoc
  // exists(user: User) {
  //   return user.email === this.email && user.password === this.password;
  // }

  /**
   * Remembers the user on check.
   * @param checked - A boolean value.
   */
  onRemember(checked: boolean) {
    this.remembered = checked;
  }

  /**
   * Verifies the disabled state of the login button.
   * @param ngForm - The login form.
   * @returns - A boolean value.
   */
  isDisabled(ngForm: NgForm) {
    return ngForm.form.invalid || !this.remembered || this.loggedIn;
  }
}
