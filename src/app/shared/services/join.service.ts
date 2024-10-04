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
import { User } from '../models/user';
import { Summary } from '../models/summary';

@Injectable({
  providedIn: 'root',
})
export class JoinService {
  firestore: Firestore = inject(Firestore);

  [key: string]: any;
  revealed: boolean;
  relocated: boolean;
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

  // jsdoc
  get signee() {
    return {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
    };
  }

  // jsdoc
  async addUser() {
    try {
      await this.setUser().then(async (userRef) => this.setUserId(userRef));
    } catch (error) {
      console.error('Error - Could not add user: ', error);
    }
  }

  // jsdoc
  async setUser() {
    return await addDoc(collection(this.firestore, 'users'), this.signee);
  }

  // jsdoc
  async setUserId(userRef: DocumentReference) {
    this.id = userRef.id;
    await this.updateUserProperty('id', this.id);
  }

  // jsdoc
  async updateUserProperty(key: string, value: string | Summary) {
    try {
      await this.setUserProperty(key, value);
    } catch (error) {
      console.log('Error - Could not update user property: ', error);
    }
  }

  // jsdoc
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
    querySnapshot.forEach((doc) => {
      let user = new User(doc.data());
      this.users.push(user);
    });
  }

  // jsdoc
  async setSecurityId() {
    this.setCharCodes();
    this.createSecurityId();
    this.user.sid = this.sid;
    await this.updateUserProperty('sid', this.user.sid);
  }

  // jsdoc
  setCharCodes() {
    this.addCharCodeGroup(48, 10);
    this.addCharCodeGroup(65, 26);
    this.addCharCodeGroup(97, 26);
  }

  // jsdoc
  addCharCodeGroup(a: number, n: number) {
    for (let i = a; i < a + n; i++) {
      this.charCodes.push(String.fromCharCode(i));
    }
  }

  // jsdoc
  createSecurityId() {
    this.sid = '';
    for (let i = 0; i < 20; i++) {
      let index = this.getRandomIndex(i);
      this.sid += this.charCodes[index];
    }
  }

  // jsdoc
  getRandomIndex(i: number) {
    if (i != 0) {
      return Math.round(Math.random() * 61);
    } else {
      return Math.round(1 + Math.random() * 60);
    }
  }
}
