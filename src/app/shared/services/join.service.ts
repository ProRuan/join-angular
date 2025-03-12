import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  Firestore,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { SessionIdService } from './session-id.service';
import { User } from '../models/user';
import { UserDoc } from '../models/user-doc';
import {
  deleteDoc,
  DocumentChange,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  Unsubscribe,
} from 'firebase/firestore';
import { getObjectArray, loadUser, setLocalItem } from '../ts/global';
import { Task } from '../models/task';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a join service.
 */
export class JoinService {
  firestore: Firestore = inject(Firestore);
  // verify!!!!
  sid: SessionIdService = inject(SessionIdService);

  // remove async/await where possible ... !
  // remove UserDoc ... !
  // remove id and sid (just work with data) ... !
  // continue with get user doc ... !
  // remove/add return type ... !
  // setUserCollection() + subscribe() ... ?
  // subscribe changes and get new user id from change ... ?!

  [key: string]: any;
  revealed: boolean;
  relocated: boolean;

  // verify!!!
  temp: any;
  user: User = new User();
  users: User[] = [];

  windowWidth: number = 0;

  unsubscribeUserCollection: Unsubscribe = () => {};
  unsubscribeUser: Unsubscribe = () => {};

  // subscribeUser() {
  //   let id = this.user.id;
  //   const unsub = onSnapshot(doc(this.firestore, 'users', id), (doc) => {
  //     console.log('Current data: ', doc.data());
  //   });
  // }

  // jsdoc + rename name --> subname and username --> name!!!
  // --> related to getUserName() and so on ...

  // add loading screen (animation)?!?

  // work with opacity and visibility!!!
  // work with opacity and visibility for other things like
  // logo animation, password mask etc.

  // verify {} of update() ...

  // necessary after using browser animation?
  // edit logo animation!
  constructor() {
    this.revealed = false;
    this.relocated = false;
  }

  /**
   * Gets a user by session id.
   * @param sid - The user session id.
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
    addDoc(collection(this.firestore, 'users'), data);
  }

  /**
   * Adds a user id to a user document at the firestore.
   * @param id - The user id.
   */
  addUserId(id: string) {
    this.updateUser(id, 'id', id);
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
   * Gets a session id.
   * @returns - The session id.
   */
  getSid() {
    return this.sid.get();
  }

  /**
   * Deletes a user task.
   * @param index - The task index.
   */
  deleteTask(index: number) {
    this.user.tasks.splice(index, 1);
  }

  /**
   * Deletes a user contact.
   * @param index - The contact index.
   */
  deleteContact(index: number) {
    this.user.contacts.splice(index, 1);
  }

  /**
   * Deletes a user.
   * @param id - The user id.
   */
  deleteUser(id: string) {
    deleteDoc(doc(this.firestore, 'users', id));
  }

  // --- to verify --- to verify ---
  // -------------------------------

  /**
   * Sets an intro to done.
   */
  setIntroDone() {
    if (!this.revealed) {
      this.revealed = true;
      this.relocated = true;
    }
  }

  // for userDocs or users?
  // one sub mehtod?!
  subscribeUserCollection() {
    const userCollectionRef = collection(this.firestore, 'users');
    this.unsubscribeUserCollection = onSnapshot(
      userCollectionRef,
      (snapshot) => {
        const docs = [...snapshot.docs];
        this.users = docs.map((doc) => new User(doc.data()['data']));
        console.log('Current users in collection:', this.users);
      }
    );
  }

  subscribeUser() {
    this.unsubscribeUser = onSnapshot(
      doc(this.firestore, 'users', this.user.id),
      (userDoc) => console.log('subscribed user: ', userDoc.data()),
      (error) => console.log('Error - Could not subscribe user: ', error)
    );
  }

  setUser(user: User) {
    this.user = new User(user);
  }

  /**
   * Loads the user.
   */
  async loadUser() {
    this.loadUserLocally();
    this.loadUserOnline();
  }

  /**
   * Loads the user locally.
   */
  loadUserLocally() {
    let user = loadUser();
    if (user) {
      this.setUser(user);
    }
  }

  // new - but still necessary???
  loadUserOnline() {
    let user = this.users.find((u) => u.id === this.user.id);
    if (user) {
      this.setUser(user);
    }
  }

  /**
   * Saves the user.
   */
  async saveUser() {
    await this.saveUserOnline();
    this.saveUserLocally();
  }

  /**
   * Saves the user online.
   */
  async saveUserOnline() {
    let id = this.user.id;
    let data = this.user.getObject();
    await this.updateUser(id, 'data', data);
  }

  /**
   * Saves the user locally.
   */
  saveUserLocally() {
    setLocalItem('user', this.user);
  }

  /**
   * Saves the user tasks.
   */
  async saveUserTasks() {
    let id = this.user.id;
    let tasks = getObjectArray<Task>(this.user.tasks, Task);
    await this.updateUser(id, 'data.tasks', tasks);
  }

  async logUserIn(user: User) {
    this.setUser(user);
    await this.saveUser();
    this.subscribeUser(); // necessary? --> app subscription!!!
  }

  setWindowWidth(value: number) {
    this.windowWidth = value;
  }
}
