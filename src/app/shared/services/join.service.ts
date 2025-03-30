import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  onSnapshot,
  QuerySnapshot,
  Unsubscribe,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { SessionIdService } from './session-id.service';
import { SummaryService } from './summary.service';
import { User } from '../models/user';
import {
  getArrayCopy,
  getLocalItem,
  setLocalItem,
  setSessionalItem,
} from '../ts/global';
import { UserData } from '../interfaces/user-data';
import { Task } from '../models/task';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a join service.
 */
export class JoinService {
  firestore: Firestore = inject(Firestore);
  sid: SessionIdService = inject(SessionIdService);
  summary: SummaryService = inject(SummaryService);

  [key: string]: any;
  user: User = new User();
  users: User[] = [];
  introDone: boolean = false;
  greetingDone: boolean = false;
  windowWidth: number = 0;
  overflowYSubject = new BehaviorSubject<string>('hidden');
  overflowY$ = this.overflowYSubject.asObservable();

  unsubscribeUserCollection: Unsubscribe = () => {};
  unsubscribeUser: Unsubscribe = () => {};

  /**
   * Sets an intro to done.
   */
  setIntroToDone() {
    if (!this.introDone) {
      this.setDone('introDone');
      this.setOverflowY('auto');
    }
  }

  /**
   * Sets a boolean property to true.
   * @param key - The property key.
   */
  setDone(key: string) {
    this[key] = true;
    setSessionalItem(key, true);
  }

  /**
   * Sets the overflow-y property of a document body.
   * @param value - The value to set.
   */
  setOverflowY(value: string): void {
    this.overflowYSubject.next(value);
    this.overflowYSubject.complete();
  }

  /**
   * Sets a greeting to done.
   */
  setGreetingToDone() {
    if (!this.greetingDone) {
      this.setDone('greetingDone');
    }
  }

  /**
   * Subscribes a user collection.
   */
  subscribeUserCollection() {
    const text = 'Error - Could not get user collection';
    this.unsubscribeUserCollection = onSnapshot(
      collection(this.firestore, 'users'),
      (snapshot) => this.getUserCollection(snapshot),
      (error) => this.logError(text, error)
    );
  }

  /**
   * Gets a user collection.
   * @param snapshot - The QuerySnapshot.
   */
  getUserCollection(snapshot: QuerySnapshot<DocumentData, DocumentData>) {
    const docs = getArrayCopy(snapshot.docs);
    this.users = docs.map((doc) => this.getUser(doc.data()));
  }

  /**
   * Gets a user from a user document.
   * @param userDoc - The user document.
   * @returns The user.
   */
  getUser(userDoc: DocumentData) {
    let data = this.getUserData(userDoc);
    return new User(data);
  }

  /**
   * Gets user data from a user document.
   * @param userDoc - The user document.
   * @returns The user data.
   */
  getUserData(userDoc: DocumentData) {
    return userDoc['data'] as UserData;
  }

  /**
   * Gets a user by session id.
   * @param sid - The session id.
   * @returns The user.
   */
  getUserBySid(sid: string) {
    return this.users.find((u) => u.sid === sid);
  }

  /**
   * Gets a registered user.
   * @param email - The user email.
   * @param password - The user password.
   * @returns The registered user.
   */
  getRegisteredUser(email: string, password?: string) {
    return this.users.find((u) => this.isRegisteredUser(u, email, password));
  }

  /**
   * Verifies a user by email and password.
   * @param user - The user to compare.
   * @param email - The email to verify.
   * @param password - The password to verify.
   * @returns A boolean value.
   */
  isRegisteredUser(user: User, email: string, password?: string) {
    if (password) {
      return user.email === email && user.password === password;
    } else {
      return user.email === email;
    }
  }

  /**
   * Adds a user document to the firestore.
   * @param data - The user data.
   */
  addUser(data: UserData) {
    addDoc(collection(this.firestore, 'users'), { data });
  }

  /**
   * Adds a user id to a user document at the firestore.
   * @param id - The user id.
   */
  addUserId(id: string) {
    this.updateUser(id, 'data.id', id);
  }

  /**
   * Updates a user at the firestore.
   * @param id - The user id.
   * @param key - The property key.
   * @param value - The property value.
   */
  updateUser(id: string, key: string, value: string | {}) {
    const userRef = doc(this.firestore, 'users', id);
    const property = this.getProperty(key, value);
    updateDoc(userRef, property);
  }

  /**
   * Gets a user property.
   * @param key - The property key.
   * @param value - The property value.
   * @returns The user property.
   */
  getProperty(key: string, value: string | {}) {
    return { [key]: value };
  }

  /**
   * Logs an error.
   * @param text - The error text.
   * @param error - The error.
   */
  logError(text: string, error: unknown) {
    console.error(`${text}: `, error);
  }

  /**
   * Updates a user session id.
   * @param id - The user id.
   * @param sid - The user session id.
   */
  updateUserSid(id: string, sid: string) {
    this.updateUser(id, 'data.sid', sid);
  }

  /**
   * Gets a session id.
   * @returns - The session id.
   */
  getSid() {
    return this.sid.get();
  }

  /**
   * Logs a user in.
   * @param user - The user.
   */
  logUserIn(user: User) {
    this.user.set(user);
    this.saveUser();
  }

  /**
   * Subscribes a user.
   */
  subscribeUser() {
    const id = this.user.id;
    const text = 'Error - Could not subscribe user';
    this.unsubscribeUser = onSnapshot(
      doc(this.firestore, 'users', id),
      (doc) => this.setChangedUser(doc.data()),
      (error) => this.logError(text, error)
    );
  }

  /**
   * Sets a changed user.
   * @param userDoc - The user document.
   */
  setChangedUser(userDoc?: DocumentData) {
    if (userDoc) {
      let data = this.getUserData(userDoc);
      this.user.set(data);
    }
  }

  /***
   * Updates a user summary.
   */
  updateSummary() {
    this.user.summary = this.summary.get(this.user.tasks);
  }

  /**
   * Adds a user item.
   * @param key - The property key.
   * @param item - The item.
   */
  addUserItem(key: string, item: Task | Contact) {
    this.user[key].push(item);
  }

  /**
   * Deletes a user item.
   * @param key - The property key.
   * @param index - The item index.
   */
  deleteUserItem(key: string, index: number) {
    this.user[key].splice(index, 1);
  }

  /**
   * Deletes a user.
   * @param id - The user id.
   */
  deleteUser(id: string) {
    deleteDoc(doc(this.firestore, 'users', id));
  }

  /**
   * Loads a user.
   */
  loadUser() {
    this.loadUserLocally();
    this.loadUserOnline();
  }

  /**
   * Loads a user locally.
   */
  loadUserLocally() {
    let user = getLocalItem('user');
    if (user) {
      this.user.set(user);
    }
  }

  /**
   * Loads a user online.
   */
  loadUserOnline() {
    let user = this.users.find((u) => this.isUserId(u));
    if (user) {
      this.user.set(user);
    }
  }

  /**
   * Verifies a user id.
   * @param user - The user to compare.
   * @returns A boolean value.
   */
  isUserId(user: User) {
    return user.id === this.user.id;
  }

  /**
   * Saves a user.
   */
  saveUser() {
    this.saveUserOnline();
    this.saveUserLocally();
  }

  /**
   * Saves a user online.
   */
  saveUserOnline() {
    const id = this.user.id;
    const data = this.user.getObject();
    this.updateUser(id, 'data', data);
  }

  /**
   * Saves a user locally.
   */
  saveUserLocally() {
    setLocalItem('user', this.user);
  }

  /**
   * Sets a window width.
   * @param value - The value to set.
   */
  setWindowWidth(value: number) {
    this.windowWidth = value;
  }
}
