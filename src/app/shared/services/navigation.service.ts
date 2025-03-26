import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JoinService } from './join.service';
import { LogService } from './log.service';
import { getLastIndex } from '../ts/global';

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

  /**
   * Gets the source path of a menu element.
   * @param img - The image name.
   * @returns The source path of the menu element.
   */
  getMenuSrc(img: string) {
    return `/assets/img/menu/${img}.png`;
  }

  /**
   * Verifies the activated state of a menu link.
   * @param id - The menu link id.
   * @returns A boolean value.
   */
  isLinkActivated(id: string) {
    return this.router.url.endsWith(id);
  }

  /**
   * Navigates by a menu link.
   * @param id - The menu link id.
   */
  navigateByLink(id: string) {
    let urls = this.getUrlFragments();
    let url = this.getUrl(urls, id);
    this.router.navigateByUrl(url);
  }

  /**
   * Gets url fragments from a current url.
   * @returns The url fragments of the current link.
   */
  getUrlFragments() {
    let urls = this.router.url.split('/');
    let lastIndex = getLastIndex(urls);
    return urls.slice(0, lastIndex);
  }

  /**
   * Gets an url.
   * @param urls - The url fragments.
   * @param id - The link id.
   * @returns The url.
   */
  getUrl(urls: string[], id: string) {
    urls.push(id);
    return urls.join('/');
  }
}
