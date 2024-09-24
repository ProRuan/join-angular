import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrioService {
  [key: string]: any;
  urgent: boolean = false;
  medium: boolean = true;
  low: boolean = false;
  prio: string = 'medium';

  constructor() {}

  get(id: string) {
    return this[id];
  }

  set(id: string) {
    this[id] = true;
    this.prio = id;
  }

  clear() {
    for (const [key] of Object.entries(this)) {
      this[key] = false;
    }
  }

  reset() {
    this.clear();
    this.medium = true;
    this.prio = 'medium';
  }
}
