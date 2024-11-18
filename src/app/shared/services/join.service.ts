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

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a join service.
 */
export class JoinService {
  firestore: Firestore = inject(Firestore);
  sid: SessionIdService = inject(SessionIdService);

  [key: string]: any;
  revealed: boolean;
  relocated: boolean;
  users: User[] = [];

  // jsdoc + rename name --> subname and username --> name!!!
  // --> related to getUserName() and so on ...

  // add loading screen (animation)?!?

  // work with opacity and visibility!!!
  // work with opacity and visibility for other things like
  // logo animation, password mask etc.

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

  /**
   * Adds the user.
   * @param data - The signee data.
   * @returns - The user id or void.
   */
  async addUser(data: any): Promise<string | void> {
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
  async addUserDoc(data: any) {
    const userRef = await this.addUserData(data);
    return await this.addUserId(userRef);
  }

  /**
   * Adds the user data.
   * @param data - The signee data.
   * @returns - The user reference.
   */
  async addUserData(data: any) {
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
    return id;
  }

  /**
   * Updates the user.
   * @param id - The user id.
   * @param key - The property key.
   * @param value - the property value.
   */
  async updateUser(id: string, key: string, value: string) {
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
  async updateUserDoc(id: string, key: string, value: string) {
    const userRef = doc(this.firestore, 'users', id);
    await updateDoc(userRef, { [key]: value });
  }

  subscribeUser(id: string) {
    // update values user and userDoc!!!
    const unsubscribe = onSnapshot(
      doc(this.firestore, 'users', id),
      (userDoc) => console.log('subscribed user: ', userDoc.data()),
      (error) => console.log('Error - Could not subscribe user: ', error)
    );
  }

  /**
   * Verifies the existence of the user.
   * @param email - The input email.
   * @returns - A boolean value.
   */
  async isUserExistent(email: string) {
    let users = await this.getUsers();
    let user = users.find((u) => u.email === email);
    return user ? true : false;
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

  /**
   * Adds the session id.
   * @param id - The user id.
   * @returns - The session id.
   */
  async addSessionId(id: string) {
    let sid = this.sid.get();
    await this.updateUser(id, 'sid', sid);
    return sid;
  }

  // // jsdoc
  // async getUser() {
  //   const userRef = doc(this.firestore, 'users', this.id);
  //   const user = await getDoc(userRef);
  //   this.verifyUser(user);
  // }

  // // jsdoc
  // verifyUser(user: DocumentSnapshot) {
  //   if (user.exists()) {
  //     this.updateUser(user);
  //   } else {
  //     console.log('User not existing!');
  //   }
  // }

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

  // add class UserDoc - check
  // add class UserId ...
  // add class UserData ...
}
