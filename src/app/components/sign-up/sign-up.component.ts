import { Component, inject } from '@angular/core';
import { JoinLogoComponent } from '../../shared/components/join-logo/join-logo.component';
import { LegalLinksComponent } from '../../shared/components/legal-links/legal-links.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { JoinService } from '../../shared/services/join.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    JoinLogoComponent,
    LegalLinksComponent,
    CommonModule,
    FormsModule,
    RouterLink,
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

  // form validation: https://v17.angular.io/guide/form-validation
  // add checkbox to validation checklist!!!

  async signUp(ngForm: NgForm) {
    // verify, if user already exists!!!
    if (ngForm.form.valid) {
      // add user
      await this.joinData.addUser(this.user);
      this.joinData.setItem('user', this.user);
      console.log('form valid');
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
}
