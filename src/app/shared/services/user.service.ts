import { inject, Injectable } from '@angular/core';
import { JoinService } from './join.service';
import { Summary } from '../models/summary';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  join: JoinService = inject(JoinService);

  constructor() {}

  get id(): string | undefined {
    return this.join.user.id;
  }

  get sid(): string | undefined {
    return this.join.user.sid;
  }

  get name(): string {
    return this.join.user.name;
  }

  get email(): string {
    return this.join.user.email;
  }

  get password(): string {
    return this.join.user.password;
  }

  get summary(): Summary | undefined {
    return this.join.user.summary;
  }

  set id(id: string) {
    this.join.user.id = id;
  }

  set sid(sid: string) {
    this.join.user.sid = sid;
  }

  set name(name: string) {
    this.join.user.name = name;
  }

  set email(email: string) {
    this.join.user.email = email;
  }

  set password(password: string) {
    this.join.user.password = password;
  }

  set summary(summary: Summary) {
    this.join.user.summary = summary;
  }
}
