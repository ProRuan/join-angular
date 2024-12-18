import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { JoinService } from '../../shared/services/join.service';
import { Firestore } from '@angular/fire/firestore';
import { SubtaskService } from '../../shared/services/subtask.service';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { CommonModule } from '@angular/common';
import { DialogAddTaskService } from '../../shared/services/dialog-add-task.service';
import { DialogViewTaskComponent } from './dialog-view-task/dialog-view-task.component';
import { DialogViewTaskService } from '../../shared/services/dialog-view-task.service';
import { DialogEditContactComponent } from './dialog-edit-contact/dialog-edit-contact.component';
import { DialogEditContactService } from '../../shared/services/dialog-edit-contact.service';
import { DialogAddContactComponent } from './dialog-add-contact/dialog-add-contact.component';
import { DialogAddContactService } from '../../shared/services/dialog-add-contact.service';
import { JoinHeaderComponent } from '../../shared/components/join-header/join-header.component';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    JoinHeaderComponent,
    DialogAddTaskComponent,
    CommonModule,
    DialogViewTaskComponent,
    DialogEditContactComponent,
    DialogAddContactComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  join: JoinService = inject(JoinService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);
  dialog: DialogService = inject(DialogService);
  subTData: SubtaskService = inject(SubtaskService);
  datData: DialogAddTaskService = inject(DialogAddTaskService);
  dvtData: DialogViewTaskService = inject(DialogViewTaskService);
  decData: DialogEditContactService = inject(DialogEditContactService);
  dacData: DialogAddContactService = inject(DialogAddContactService);

  mainToken: any;
  sid: any;
  // user = new User();
  // users: User[] = [];

  // create own function!!!
  async ngOnInit() {
    // const sid = this.route.snapshot.paramMap.get('id');
    // console.log('main user sid: ', sid);
    // if (sid) {
    //   this.join.sid = sid;
    //   // set user via UserService --> get/set user from join!!!
    //   this.sid = sid;
    //   let user = this.join.users.find((u) => u.sid == sid);
    //   if (user) {
    //     this.join.user = new User(user);
    //     if (this.join.user.id) {
    //       this.join.id = this.join.user.id;
    //       this.join.subscribeUser();
    //     }
    //     console.log('main user: ', this.join.user);
    //   }
    // } else {
    //   console.log('no main user');
    // }
  }
}
