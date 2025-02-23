import { Injectable } from '@angular/core';
import { dueDatePatterns } from '../ts/pattern';

@Injectable({
  providedIn: 'root',
})
export class DateFormatterService {
  pattern: RegExp;

  // only one formatter service ... ?

  constructor() {
    this.pattern = dueDatePatterns.dueDate;
  }

  // getMatchDate(value: string) {
  //   return value.match(this.pattern);
  // }

  getDateObject(result: RegExpMatchArray) {
    return { day: result[1], month: result[2], year: result[3] };
  }

  // testing!!!
  getCalendarDate(date: string) {
    return date.split('/').reverse().join('-');
  }

  // testing!!!
  getInputDate(date: string) {
    return date.split('-').reverse().join('/');
  }

  getSplitDate(date: string, sign: string) {
    return date.split(sign);
  }

  getJoinedDate(date: string[], sign: string) {
    return date.join(sign);
  }
}
