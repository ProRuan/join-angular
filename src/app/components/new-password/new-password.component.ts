import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogComponent } from '../../shared/components/log/log.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { JoinService } from '../../shared/services/join.service';
import { passwordVal } from '../../shared/services/input-validation.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // RouterLink, // verify!!!
    LogComponent,
    LogoComponent,
    HeaderComponent,
    TitleComponent,
    TextInputComponent,
    PasswordInputComponent,
    FooterComponent,
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);

  // set functions!!!
  // ask for email first!!!
  // add new password link to login!!!

  [key: string]: any;
  email: string = 'rudolf.sachslehner@mail.com'; // reset!!!
  emailKnown: boolean = false;
  password: string = '';
  matchword: string = '';
  passwordPat: RegExp = passwordVal.passwordPat;
  newPasswordSet: boolean = false;
  logKey: string = '';
  logged: boolean = false;

  async onSignUp(ngForm: NgForm) {
    // ony for testing - move!!!
    let userDoc = await this.join.getUserDoc(this.email);
    if (userDoc) {
      this.emailKnown = true;
      console.log('user found: ', this.email);
    } else {
      console.log('user not found: ', this.email);
    }

    if (ngForm.form.valid) {
    }
  }

  onBack() {
    // set sid by email!!!
    let url = 'login';
    // let url =  let url = `login/${sid}`;
    this.router.navigateByUrl(url);
    this.join.setIntroDone();
  }

  /**
   * Verifies the disabled state of the new password button.
   * @param ngForm - The new password form.
   * @returns - A boolean value.
   */
  isDisabled(ngForm: NgForm) {
    return ngForm.form.invalid || this.newPasswordSet;
  }
}
