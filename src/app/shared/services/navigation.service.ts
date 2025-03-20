import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JoinService } from './join.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a navigation service.
 */
export class NavigationService {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  log: LogService = inject(LogService);

  /**
   * Opens a login session.
   * @param id - The user id.
   * @param text - The log text.
   */
  openLoginSession(id: string, text: string) {
    let sid = this.join.getSid();
    this.join.updateUserSid(id, sid);
    this.log.setLog(true, text);
    this.redirectsToCustomLogin(sid);
  }

  /**
   * Redirects to a custom login.
   * @param sid - The session id.
   */
  redirectsToCustomLogin(sid: string) {
    setTimeout(() => this.redirectsToLogin(`login/${sid}`), 1000);
  }

  /**
   * Redirects to a login.
   * @param url - The login url.
   */
  redirectsToLogin(url: string) {
    this.router.navigateByUrl(url);
    this.log.setLog(false);
  }
}
