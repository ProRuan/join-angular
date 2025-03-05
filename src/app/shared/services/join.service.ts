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
import { DocumentData, DocumentSnapshot, getDoc } from 'firebase/firestore';
import { getObjectArray, loadUser, setLocalItem } from '../ts/global';
import { Task } from '../models/task';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a join service.
 */
export class JoinService {
  firestore: Firestore = inject(Firestore);
  sid: SessionIdService = inject(SessionIdService);

  // review all funtions due to local user!!!
  //   --> save at least one parameter, e. g. this.id!!!

  [key: string]: any;
  revealed: boolean;
  relocated: boolean;
  temp: any;
  user: User = new User();
  users: User[] = [];
  userDocs: UserDoc[] = [];

  windowWidth: number = 0;

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

  // edit!!!
  constructor() {
    this.revealed = false;
    this.relocated = false;
  }

  /**
   * Sets the intro to done.
   */
  setIntroDone() {
    if (!this.revealed) {
      this.revealed = true;
      this.relocated = true;
    }
  }

  setWindowWidth(value: number) {
    this.windowWidth = value;
  }

  /**
   * Adds the user.
   * @param data - The signee data.
   * @returns - The user id or void.
   */
  async addUser(data: UserData): Promise<string | void> {
    try {
      return await this.addUserDoc(data);
    } catch (error) {
      console.error('Error - Could not add user: ', error);
    }
  }

  /**
   * Adds the user document.
   * @param data - The signee data.
   * @returns - The user id.
   */
  async addUserDoc(data: UserData) {
    const userRef = await this.addUserData(data);
    return await this.addUserId(userRef);
  }

  /**
   * Adds the user data.
   * @param data - The signee data.
   * @returns - The user reference.
   */
  async addUserData(data: UserData) {
    return await addDoc(collection(this.firestore, 'users'), data);
  }

  /**
   * Adds the user id.
   * @param userRef - The user reference.
   * @returns - The user id.
   */
  async addUserId(userRef: DocumentReference) {
    const id = userRef.id;
    await this.updateUser(id, 'id', id);
    await this.updateUser(id, 'data.id', id);
    return id;
  }

  /**
   * Updates the user.
   * @param id - The user id.
   * @param key - The property key.
   * @param value - the property value.
   */
  async updateUser(id: string, key: string, value: string | {}) {
    try {
      await this.updateUserDoc(id, key, value);
    } catch (error) {
      console.log('Error - Could not update user: ', error);
    }
  }

  /**
   * Updates the user document.
   * @param id - The user id.
   * @param key - The property key.
   * @param value - The property value.
   */
  async updateUserDoc(id: string, key: string, value: string | {}) {
    const userRef = doc(this.firestore, 'users', id);
    await updateDoc(userRef, { [key]: value });
  }

  /**
   * Provides the user document.
   * @param email - The input email.
   * @param password - The input password.
   * @returns - The user document or undefined.
   */
  async getUserDoc(email: string, password?: string) {
    let userDocs = await this.getUserDocs();
    return userDocs.find((u) => this.isUserDoc(u.data, email, password));
  }

  /**
   * Verifies the user document.
   * @param user - The user object.
   * @param email - The email to match.
   * @param password - The password to match.
   * @returns - A boolean value.
   */
  isUserDoc(user: User, email: string, password?: string) {
    let emailExistent = user.email === email;
    let passwordExistent = user.password === password;
    return password ? emailExistent && passwordExistent : emailExistent;
  }

  /**
   * Provides the session id.
   * @param id - The user id.
   * @returns - The session id.
   */
  async getSessionId(id: string) {
    let sid = this.sid.get();
    await this.updateUser(id, 'sid', sid);
    return sid;
  }

  // improve: e. g. add-task: log user tasks and perhaps user summary?!
  subscribeUser() {
    const unsubscribe = onSnapshot(
      doc(this.firestore, 'users', this.user.id),
      (userDoc) => console.log('subscribed user: ', userDoc.data()),
      (error) => console.log('Error - Could not subscribe user: ', error)
    );
  }

  // // jsdoc
  // subscribeUser() {
  //   const unsubscribe = onSnapshot(
  //     doc(this.firestore, 'users', this.id),
  //     (user) => this.updateUser(user),
  //     (error) => this.logError(error)
  //   );
  // }

  // // update userDoc - not user!!!
  // updateUser(user: DocumentSnapshot) {
  //   this.user['data'] = new User(user.data());
  // }

  // // jsdoc
  // logError(error: FirestoreError) {
  //   console.log('Error - Could not subscribe user: ', error);
  // }

  setUser(user: User) {
    this.user = new User(user);
  }

  // jsdoc
  async getUser(id: string) {
    const userRef = doc(this.firestore, 'users', id);
    const user = await getDoc(userRef);
    return user.exists() ? new UserDoc(user.data()) : undefined;
    // this.verifyUser(user);
  }

  // // jsdoc
  // async getUser(id: string) {
  //   const userRef = doc(this.firestore, 'users', id);
  //   const user = await getDoc(userRef);
  //   return user.exists() ? new UserDoc(user.data()) : undefined;
  //   // this.verifyUser(user);
  // }

  // jsdoc
  verifyUser(user: DocumentSnapshot): DocumentData | void {
    if (user.exists()) {
      return new UserDoc(user.data());
    } else {
      console.log('User not existing!');
    }
  }

  // // jsdoc
  // async deleteUser() {
  //   await deleteDoc(doc(this.firestore, 'users', this.id));
  // }

  async getUsers() {
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    this.pushUsers(querySnapshot);
    return this.users;
  }

  pushUsers(querySnapshot: QuerySnapshot) {
    this.users = [];
    querySnapshot.forEach((doc) => {
      let user = doc.data();
      let userData = user['data'];
      console.log('user data: ', userData);
      let tempUser = new User(userData);
      this.users.push(tempUser);
      console.log('users: ', this.users);
    });
  }

  async getUserDocs() {
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    this.pushUserDocs(querySnapshot);
    return this.userDocs;
  }

  pushUserDocs(querySnapshot: QuerySnapshot) {
    this.userDocs = [];
    querySnapshot.forEach((doc) => {
      let userDoc = new UserDoc(doc.data());
      this.userDocs.push(userDoc);
    });
  }

  async getUserBySid(sid: string) {
    let userDocs = await this.getUserDocs();
    let userDoc = userDocs.find((u) => u.sid == sid);
    return userDoc ? new User(userDoc.data) : undefined;
  }

  /**
   * Loads the user.
   */
  async loadUser() {
    this.loadUserLocally();
    await this.loadUserOnline();
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

  /**
   * Loads the user online.
   */
  async loadUserOnline() {
    let userDoc = await this.getUser(this.user.id);
    if (userDoc) {
      this.setUser(userDoc.data);
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

  // add class UserDoc - check
  // add class UserId ...
  // add class UserData ...
}
