import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryTaskComponent } from './summary-task/summary-task.component';
import { SummaryTaskInfoComponent } from './summary-task-info/summary-task-info.component';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, SummaryTaskComponent, SummaryTaskInfoComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  item$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);

  users: any[] = [];

  summaryTasks = [
    {
      defaultPath: './assets/img/summary/to_do.png',
      hoverPath: './assets/img/summary/to_do_hover.png',
      alt: 'to_do',
      amount: 1,
      category: 'To-do',
    },
    {
      defaultPath: './assets/img/summary/done.png',
      hoverPath: './assets/img/summary/done_hover.png',
      alt: 'done',
      amount: 1,
      category: 'Done',
    },
  ];

  summaryTaskInfo = [
    {
      amount: 5,
      category: 'Tasks In Board',
    },
    {
      amount: 2,
      category: 'Tasks In Progress',
    },
    {
      amount: 2,
      category: 'Awaiting Feedback',
    },
  ];

  constructor() {
    const itemCollection = collection(this.firestore, 'items');
    this.item$ = collectionData<any>(itemCollection);
    console.log('item collection: ', itemCollection);
    console.log('item: ', this.item$);

    this.users = [];
    // this.addDoc();
    // this.getDoc();
  }

  async addDoc() {
    // add user object/json
    try {
      const docRef = await addDoc(collection(this.firestore, 'users'), {
        name: 'test name',
        email: 'test@mail.com',
        password: 'test1234',
      });
      console.log('Document written with ID: ', docRef.id);

      await this.updateDoc(docRef.id);
      this.getDocs();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async getDocs() {
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);

      console.log('doc id: ', doc.id);
      console.log('doc data: ', doc.data());

      let user = new User(doc.data());
      this.users.push(user);
      console.log('users: ', this.users);
    });
  }

  async updateDoc(id: string) {
    const userRef = doc(this.firestore, 'users', id);
    await updateDoc(userRef, {
      id: id,
    });
  }
}
