import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class JoinService {
  item$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);

  users: any[] = [];

  // Rename to UserService? --> add(), update(), get(), delete()!
  // snapshot: https://firebase.google.com/docs/firestore/query-data/listen?hl=de
  // converter: https://firebase.google.com/docs/firestore/query-data/get-data?hl=de

  constructor() {
    const itemCollection = collection(this.firestore, 'items');
    this.item$ = collectionData<any>(itemCollection);
    console.log('item collection: ', itemCollection);
    console.log('item: ', this.item$);

    this.users = [];
    // this.addUser();
    this.getUsers();
    this.getUser();
    // this.getUser();
    this.deleteUser();
  }

  async addUser() {
    // add user object/json
    try {
      const docRef = await addDoc(collection(this.firestore, 'users'), {
        name: 'test name',
        email: 'test@mail.com',
        password: 'test1234',
      });
      console.log('Document written with ID: ', docRef.id);

      await this.updateUser(docRef.id);
      this.getUsers();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async getUsers() {
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);

      console.log('doc id: ', doc.id);
      console.log('doc data: ', doc.data());

      let user = new User(doc.data());
      this.users.push(user);
      console.log('users: ', this.users);

      let taskSummary = this.users[0].taskSummary;
      console.log('task summary: ', taskSummary);
    });
  }

  async getUser() {
    const docRef = doc(this.firestore, 'users', 'mZxmq4I0cGCP96KXKIeJ');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('user data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('user not existing!');
    }
  }

  async updateUser(id: string) {
    const userRef = doc(this.firestore, 'users', id);
    await updateDoc(userRef, {
      id: id,
    });
  }

  async deleteUser() {
    let id = 'RLD41Asnjx0jBxqsED1l';
    await deleteDoc(doc(this.firestore, 'users', id));
    console.log('deleted user: ', id);
  }
}
