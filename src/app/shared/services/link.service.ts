import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  mainLinks = [
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
