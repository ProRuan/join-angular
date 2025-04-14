import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JoinService } from './join.service';
import { DialogService } from './dialog.service';
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
  dialogs: DialogService = inject(DialogService);

  /**
   * Updates a login state.
   */
  updateLoginState() {
    const urlSplit = this.router.url.split('/');
    this.join.loggedIn = urlSplit.length > 3 ? true : false;
  }

  /**
   * Opens a login session.
   * @param id - The user id.
   */
  openLoginSession(id: string) {
    this.dialogs.open('backlog');
    setTimeout(() => this.redirectToLogin(`login/${id}`), 1000);
  }

  /**
   * Redirects to a login.
   * @param url - The login url.
   */
  redirectToLogin(url: string) {
    this.router.navigateByUrl(url);
    this.dialogs.close('backlog');
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
   * Navigates by menu link.
   * @param id - The menu link id.
   */
  navigateByLink(id: string) {
    let urls = this.getUrlFragments();
    let url = this.getUrl(urls, id);
    this.router.navigateByUrl(url);
  }

  /**
   * Gets url fragments from a current url.
   * @returns The url fragments of the current url.
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
