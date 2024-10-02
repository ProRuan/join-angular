import { DocumentData } from 'firebase/firestore';
import { Contact } from '../interfaces/contact';
import { Summary } from './summary';
import { Task } from './task';

// jsdoc
export class User {
  [key: string]: any; // to update!!!
  id?: string;
  sid?: string;
  inititals?: string;
  color: string;
  name: string;
  email: string;
  password: string;
  summary?: Summary;
  tasks?: Task[];
  contacts?: Contact[];

  constructor(user?: DocumentData | User) {
    this.color = 'lightblue';
    this.name = user ? user.name : '';
    this.email = user ? user.email : '';
    this.password = user ? user.password : '';
    this.setIdentifiers(user);
    this.setInitials(user);
    this.setJoinData(user);
  }

  // jsdoc
  setProperty(user: DocumentData | User | undefined, key: string) {
    if (user && user[key]) {
      this[key] = user[key];
    }
  }

  // jsdoc
  setIdentifiers(user: DocumentData | User | undefined) {
    this.setProperty(user, 'id');
    this.setProperty(user, 'sid');
  }

  setInitials(user: DocumentData | User | undefined) {
    this.setProperty(user, 'initials');
  }

  // jsdoc
  setJoinData(user: DocumentData | User | undefined) {
    this.setProperty(user, 'summary');
    this.setProperty(user, 'tasks');
    this.setProperty(user, 'contacts');
  }
}
