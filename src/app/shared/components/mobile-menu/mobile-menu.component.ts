import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { getLastElement, setSessionalItem } from '../../ts/global';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  // router: global double code?
  router: Router = inject(Router);

  // add link object ...
  // link object on service ...
  // save current link during login session ...

  // double code
  onNavigate(id: string) {
    let url = this.getUrl();
    url.push(id);
    console.log('url: ', url);

    this.router.navigate(url);
    // setSessionalItem('route', id);
  }

  // getLastIndex as global function!
  getUrl() {
    let url = this.router.url.split('/');
    let lastIndex = url.length - 1;
    return url.slice(0, lastIndex);
  }

  // double code
  isDisabled(id: string) {
    return this.router.url.endsWith(id);
  }
}
