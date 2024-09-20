import { Component, inject } from '@angular/core';
import { JoinLogoComponent } from '../../shared/components/join-logo/join-logo.component';
import { LegalLinksComponent } from '../../shared/components/legal-links/legal-links.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { JoinService } from '../../shared/services/join.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../shared/components/input/input.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    JoinLogoComponent,
    LegalLinksComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    InputComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  joinData: JoinService = inject(JoinService);
  route: Router = inject(Router);
  // think about namePat
  // think about emailPat
  // think about passwordPat
  emailPat = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
  passwordPat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  user = new User();
  confirmedPassord: string = '';
  checkboxChecked: boolean = false;

  myInputValue = 'Thank you, ChatGPT!';

  // form validation: https://v17.angular.io/guide/form-validation
  // add checkbox to validation checklist!!!

  home() {
    this.route.navigateByUrl('login');
  }

  async signUp(ngForm: NgForm) {
    // verify, if user already exists!!!
    if (ngForm.form.valid) {
      // add user
      await this.joinData.addUser(this.user);
      this.joinData.setItem('user', this.user);
      // console.log('form valid');
      this.route.navigateByUrl('login' + '/' + this.joinData.getSignUpToken());
    }
  }

  getPassword() {
    let password = this.user.password;
    if (password.match(this.passwordPat)) {
      return new RegExp(password);
    } else {
      return this.passwordPat;
    }
  }

  verifyPassword() {
    let password1 = this.user.password.match(this.passwordPat);
    let password2 = this.confirmedPassord.match(this.passwordPat);
    let matched = this.user.password != this.confirmedPassord;
    return password1 && password2 && matched ? true : false;
  }

  getCheckbox() {
    return this.checkboxChecked ? 'checked' : 'check';
  }

  getSrc() {
    if (this.checkboxChecked) {
      return '../../../assets/img/sign-up/checked.png';
    } else {
      return '../../../assets/img/sign-up/check.png';
    }
  }

  accept() {
    this.checkboxChecked = !this.checkboxChecked ? true : false;
  }

  // sign up
  // -------
  // check box button
  // classes
  // color variables
  // input error
  // password stars
  // secure form logic

  // input component
}
