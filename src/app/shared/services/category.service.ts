import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  opened: boolean = false;

  constructor() {}

  set(value: boolean) {
    this.opened = value;
    console.log('catData: ', this.opened);
    
  }
}
