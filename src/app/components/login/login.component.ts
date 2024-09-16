import { Component, inject } from '@angular/core';
import { JoinLogoComponent } from '../../shared/components/join-logo/join-logo.component';
import { LegalLinksComponent } from '../../shared/components/legal-links/legal-links.component';
import { JoinService } from '../../shared/services/join.service';
import { CommonModule, ɵparseCookieValue } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';

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
  user = new User();

  async ngOnInit() {
    const userToken = this.route.snapshot.paramMap.get('id');
    console.log('user token: ', userToken);

    // let tempUser = await this.joinData.getUser();
    // this.user.email = tempUser.email;
    // this.user.password = tempUser.password;
    // console.log('init login: ', tempUser);
  }

  onSubmit(ngForm: NgForm) {}
}
