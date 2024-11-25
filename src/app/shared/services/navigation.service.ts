import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JoinService } from './join.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a navigation service.
 */
export class NavigationService {
  router: Router = inject(Router);
  join: JoinService = inject(JoinService);
  log: LogService = inject(LogService);

  /**
   * Opens a login session.
   * @param id - The user id.
   */
  async openLoginSession(id: string) {
    let sid = await this.join.getSessionId(id);
    if (sid) {
      this.log.setLog(true, 'newPassword');
      this.selectCustomLogin(sid);
    }
  }

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
    this.join.setIntroDone();
    this.router.navigateByUrl(url);
    this.log.setLog(false);
  }
}
