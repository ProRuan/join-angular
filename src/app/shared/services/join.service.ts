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
import { SessionId } from '../models/session-id';

@Injectable({
  providedIn: 'root',
})
export class JoinService {
  firestore: Firestore = inject(Firestore);

  [key: string]: any;
  revealed: boolean;
  relocated: boolean;

  // // verify!!!
  // id: string;
  // sid: string;
  // user: User;
  // userDoc: UserDoc;
  // userDocs: UserDoc[];
  // users: User[];
  // charCodes: string[];

  // edit!!!
  constructor() {
    this.revealed = false;
    this.relocated = false;
    // this.id = '';
    // this.sid = '';
    // this.user = new User();
    // this.userDoc = new UserDoc();
    // this.userDocs = [];
    // this.users = [];
    // this.charCodes = [];
  }

  // get signee() {
  //   return {
  //     initials: nameVal.getInitials(this.user.name),
  //     name: nameVal.getUserName(this.user.name),
  //     email: this.user.email,
  //     password: this.user.password,
  //   };
  // }

  /**
   * Sets the intro to done.
   */
  setIntroDone() {
    if (!this.revealed) {
      this.revealed = true;
      this.relocated = true;
    }
  }

  // // jsdoc + then as async fn?!
  // async addUser() {
  //   try {
  //     await this.setUser().then((userRef) => this.setUserId(userRef));
  //   } catch (error) {
  //     console.error('Error - Could not add user: ', error);
  //   }
  // }

  // /**
  //  * Sets a user.
  //  * @returns - The user reference.
  //  */
  // async setUser() {
  //   return await addDoc(collection(this.firestore, 'users'), {
  //     data: this.signee,
  //   });
  // }

  // /**
  //  * Set the user id.
  //  * @param userRef - The user Reference.
  //  */
  // async setUserId(userRef: DocumentReference) {
  //   this.id = userRef.id;
  //   await this.updateUserProperty('id', this.id);
  // }

  // // jsdoc + data types
  // async updateUserProperty(key: string, value: string | Summary) {
  //   try {
  //     await this.setUserProperty(key, value);
  //   } catch (error) {
  //     console.log('Error - Could not update user property: ', error);
  //   }
  // }

  // // jsdoc + data types
  // async setUserProperty(key: string, value: string | Summary) {
  //   const userRef = doc(this.firestore, 'users', this.id);
  //   await updateDoc(userRef, { [key]: value });
  // }

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

  // // jsdoc
  // async getUsers() {
  //   const querySnapshot = await getDocs(collection(this.firestore, 'users'));
  //   this.pushUsers(querySnapshot);
  // }

  // pushUsers(querySnapshot: QuerySnapshot) {
  //   this.users = [];
  //   querySnapshot.forEach((doc) => {
  //     let docData = doc.data();
  //     let user = new User(doc.data());
  //     console.log('user data - test: ', doc.data());
  //     let userDoc = new UserDoc(doc);
  //     // new object and new object array!!!
  //     user.name = docData['data'].name;
  //     user.email = docData['data'].email;
  //     user.password = docData['data'].password;
  //     this.users.push(user);
  //     console.log('user doc - test: ', userDoc);
  //     this.userDocs.push(userDoc);
  //   });
  // }

  // // rename!!!
  // async setSecurityId() {
  //   this.user.sid = new SessionId().get();
  //   await this.updateUserProperty('sid', this.user.sid);
  // }

  // add class UserDoc - check
  // add class UserId ...
  // add class UserData ...
}
