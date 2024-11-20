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

  [key: string]: any;
  email: string = '';
  password: string = '';
  emailPat: RegExp = emailVal.emailPat;
  passwordPat: RegExp = passwordVal.passwordPat;
  remembered: boolean = false;
  loggedIn: boolean = false;
  hint = 'Check your email and password. Please try again.';

  /**
   * Initializes the login component.
   */
  async ngOnInit() {
    await this.setEmailOfSignee();
  }

  /**
   * Sets the email of the signee.
   */
  async setEmailOfSignee() {
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

  /**
   * Processes the login data on submit.
   * @param ngForm - The login form.
   */
  async onLogIn(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.loggedIn = true;
      await this.processLoginData();
    }
  }

  /**
   * Processes the login data.
   */
  async processLoginData() {
    let userDoc = await this.join.getUserDoc(this.email, this.password);
    if (userDoc) {
      await this.executeLogin(userDoc.id);
    }
  }

  /**
   * Executes the user login.
   * @param id - The user id.
   */
  async executeLogin(id: string) {
    let sid = await this.join.getSessionId(id);
    this.router.navigate(['main', sid, 'summary']);
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
    return ngForm.form.invalid || this.loggedIn;
  }
}
