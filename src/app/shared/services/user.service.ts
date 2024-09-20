import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a user service.
 */
export class UserService {
  firestore: Firestore = inject(Firestore);

  id: string = '';
  sid: string = '';
  charCodes: string[] = [];

  // necessary?
  users: User[] = [];

  constructor() {}

  async setUp(user: User) {
    const id = await this.addUser(user);
    this.id = id;
    await this.updateUser(id, 'id', id);
    this.setSessionId();
    await this.updateUser(id, 'sid', this.sid);
  }

  async addUser(user?: any) {
    try {
      const userRef = await addDoc(collection(this.firestore, 'users'), {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      return userRef.id;
    } catch (e) {
      console.error('Error adding document: ', e);
      return '0';
    }
  }

  async updateUser(id: string, key: string, sid: string) {
    if (id != '0') {
      const userRef = doc(this.firestore, 'users', id);
      await updateDoc(userRef, {
        [key]: sid,
      });
    }
  }

  async getUser(id: string) {
    const userRef = doc(this.firestore, 'users', id);
    const user = await getDoc(userRef);
    if (user.exists()) {
      console.log('new user: ', user.data());

      return user.data();
    } else {
      console.log('user not existing!');
      return new User();
    }
  }

  async getUsers() {
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);

      // console.log('doc id: ', doc.id);
      // console.log('doc data: ', doc.data());

      let user = new User(doc.data());
      this.users.push(user);

      let taskSummary = this.users[0].taskSummary;
      // console.log('task summary: ', taskSummary);
    });
    console.log('users: ', this.users);
  }

  async deleteUser() {
    let id = 'RLD41Asnjx0jBxqsED1l';
    await deleteDoc(doc(this.firestore, 'users', id));
    // console.log('deleted user: ', id);
  }

  /**
   * Sets the session id.
   */
  setSessionId() {
    this.setCharCodes();
    this.createSessionId();
  }

  /**
   * Sets the value of 'charCodes'.
   */
  setCharCodes() {
    this.addCharCodeGroup(48, 10);
    this.addCharCodeGroup(64, 26);
    this.addCharCodeGroup(97, 26);
  }

  /**
   * Adds a group of char codes.
   * @param a - The first code of this group.
   * @param n - The number of char codes.
   */
  addCharCodeGroup(a: number, n: number) {
    for (let i = a; i < a + n - 1; i++) {
      this.charCodes.push(String.fromCharCode(i));
    }
  }

  /**
   * Creates the session id.
   */
  createSessionId() {
    this.sid = '';
    for (let i = 0; i < 20; i++) {
      let index = this.getRandomIndex(i);
      this.sid += this.charCodes[index];
    }
  }

  /**
   * Provides a random index.
   * @param i - The id of the current loop.
   * @returns - A random index.
   */
  getRandomIndex(i: number) {
    if (i != 0) {
      return Math.round(Math.random() * 61);
    } else {
      return Math.round(1 + Math.random() * 60);
    }
  }
}
