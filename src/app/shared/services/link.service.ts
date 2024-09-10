import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  mainLinks = [
    {
      path: './assets/img/menu/summary_icon.png',
      alt: 'summary_icon',
      text: 'Summary',
      active: true,
    },
    {
      path: './assets/img/menu/task_icon.png',
      alt: 'task_icon',
      text: 'Add task',
      active: false,
    },
    {
      path: './assets/img/menu/board_icon.png',
      alt: 'board_icon',
      text: 'Board',
      active: false,
    },
    {
      path: './assets/img/menu/contacts_icon.png',
      alt: 'contacts_icon',
      text: 'Contacts',
      active: false,
    },
  ];

  set(i: number) {
    this.reset();
    this.mainLinks[i].active = true;
  }

  reset() {
    this.mainLinks.forEach((link) => {
      link.active = false;
    });
  }

  // Create only mainLinkService?!?
}
