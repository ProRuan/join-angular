import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  FirestoreError,
  getDoc,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
} from '@angular/fire/firestore';

// verify!!!
import { User } from '../models/user';
import { Summary } from '../models/summary';
import { SessionId } from '../models/session-id';
import { NameVal } from '../models/name-val';

@Injectable({
  providedIn: 'root',
})
export class JoinService {
  firestore: Firestore = inject(Firestore);

  [key: string]: any;
  revealed: boolean;
  relocated: boolean;

  // verify!!!
  id: string;
  sid: string;
  user: User;
  users: User[];
  charCodes: string[];

  // edit!!!
  constructor() {
    this.revealed = false;
    this.relocated = false;
    this.id = '';
    this.sid = '';
    this.user = new User();
    this.users = [];
    this.charCodes = [];
  }

  /**
   * Provides the signee.
   * @returns - The signee.
   */
  get signee() {
    let user = new NameVal(this.user.name);
    return {
      initials: user.initials,
      name: user.name,
      email: this.user.email,
      password: this.user.password,
    };
  }

  // jsdoc + then as async fn?!
  async addUser() {
    try {
      await this.setUser().then((userRef) => this.setUserId(userRef));
    } catch (error) {
      console.error('Error - Could not add user: ', error);
    }
  }

  /**
   * Sets a user.
   * @returns - The user reference.
   */
  async setUser() {
    return await addDoc(collection(this.firestore, 'users'), this.signee);
  }

  /**
   * Set the user id.
   * @param userRef - The user Reference.
   */
  async setUserId(userRef: DocumentReference) {
    this.id = userRef.id;
    await this.updateUserProperty('id', this.id);
  }

  // jsdoc + data types
  async updateUserProperty(key: string, value: string | Summary) {
    try {
      await this.setUserProperty(key, value);
    } catch (error) {
      console.log('Error - Could not update user property: ', error);
    }
  }

  // jsdoc + data types
  async setUserProperty(key: string, value: string | Summary) {
    const userRef = doc(this.firestore, 'users', this.id);
    await updateDoc(userRef, { [key]: value });
  }

  // jsdoc
  subscribeUser() {
    const unsubscribe = onSnapshot(
      doc(this.firestore, 'users', this.id),
      (user) => this.updateUser(user),
      (error) => this.logError(error)
    );
  }

  // jsdoc
  updateUser(user: DocumentSnapshot) {
    this.user = new User(user.data());
  }

  // jsdoc
  logError(error: FirestoreError) {
    console.log('Error - Could not subscribe user: ', error);
  }

  // jsdoc
  async getUser() {
    const userRef = doc(this.firestore, 'users', this.id);
    const user = await getDoc(userRef);
    this.verifyUser(user);
  }

  // jsdoc
  verifyUser(user: DocumentSnapshot) {
    if (user.exists()) {
      this.updateUser(user);
    } else {
      console.log('User not existing!');
    }
  }

  // jsdoc
  async deleteUser() {
    await deleteDoc(doc(this.firestore, 'users', this.id));
  }

  // jsdoc
  async getUsers() {
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    this.pushUsers(querySnapshot);
  }

  // jsdoc
  pushUsers(querySnapshot: QuerySnapshot) {
    this.users = [];
    querySnapshot.forEach((doc) => {
      let user = new User(doc.data());
      this.users.push(user);
    });
  }

  // rename!!!
  async setSecurityId() {
    this.user.sid = new SessionId().get();
    await this.updateUserProperty('sid', this.user.sid);
  }
}
