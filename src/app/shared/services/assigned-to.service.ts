import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssignedToService {
  opened: boolean = false;

  constructor() {}

  set(value: boolean) {
    this.opened = value;
    // console.log('asToData opened: ', this.opened);
  }
}
