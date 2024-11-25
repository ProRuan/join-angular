import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JoinService } from './join.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a navigation service.
 */
export class NavigationService {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);

  /**
   * Selects the custom login.
   * @param sid - The session id.
   */
  selectCustomLogin(sid: string) {
    setTimeout(() => {
      let url = `login/${sid}`;
      this.backToLogin(url);
    }, 1000);
  }

  /**
   * Redirects to the login.
   * @param url - The url of the component.
   */
  backToLogin(url: string) {
    this.router.navigateByUrl(url);
    this.join.setIntroDone();
  }
}
