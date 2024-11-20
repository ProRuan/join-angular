import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import {
  emailVal,
  passwordVal,
} from '../../shared/services/input-validation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LogoComponent,
    HeaderComponent,
    TitleComponent,
    TextInputComponent,
    PasswordInputComponent,
    CheckboxComponent,
    FooterComponent,
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

  // rename functions (see: sign-up)!
  // check email hint!
  // check password hint!

  // remember me is not required!!!
  // provided remember me functions!!!

  // no subscribeUser() for sign-up comp!?!
  // fix email error!!!

  // add routerlink!?
  // adapt text input!
  // adapt password input!

  [key: string]: any;
  email: string = '';
  password: string = '';
  emailPat: RegExp = emailVal.emailPat;
  passwordPat: RegExp = passwordVal.passwordPat;
  remembered: boolean = false;
  loggedIn: boolean = false;
  // verify!!!
  hint = 'Check your email and password. Please try again.';

  /**
   * Initializes the login component.
   */
  async ngOnInit() {
    await this.setEmailOfSignees();
  }

  /**
   * Sets the email of signees.
   */
  async setEmailOfSignees() {
    let sid = this.route.snapshot.paramMap.get('id');
    if (sid) {
      await this.setEmail(sid);
    }
  }

  /**
   * Sets the email.
   * @param sid - The session id.
   */
  async setEmail(sid: string) {
    let user = await this.join.getUserBySid(sid);
    if (user) {
      this.email = user.email;
    }
  }

  async logIn(ngForm: NgForm) {
    if (ngForm.form.valid) {
      // rename variables and functions!!!
      let userDoc = await this.join.isUserToLogin(this.email, this.password);
      if (userDoc) {
        // set user + user.sid + updateUserData!!!
        // userExistend --> user due to user.sid!!!

        // fix email input error!
        // improve subscribeUser() and addSessionId()!!!
        // work with rxjs?!?

        let id = userDoc.id;
        let sid = await this.join.addSessionId(id);

        console.log('user login successfully: ', userDoc);
        this.router.navigate(['main', sid, 'summary']);
      } else {
        console.log('user unknown');
      }
    }
  }

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
