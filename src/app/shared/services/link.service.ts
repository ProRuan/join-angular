import { Injectable } from '@angular/core';
import { MainLinkSource } from '../interfaces/main-link-source';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  mainLinks: MainLinkSource[] = [
    {
      fileName: 'summary_icon',
      text: 'Summary',
    },
    {
      fileName: 'task_icon',
      text: 'Add task',
    },
    {
      fileName: 'board_icon',
      text: 'Board',
    },
    {
      fileName: 'contacts_icon',
      text: 'Contacts',
    },
  ];
}
