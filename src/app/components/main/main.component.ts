import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { JoinService } from '../../shared/services/join.service';
import { Firestore } from '@angular/fire/firestore';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../models/user';
import { AssignedToService } from '../../shared/services/assigned-to.service';
import { SubtaskService } from '../../shared/services/subtask.service';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { CommonModule } from '@angular/common';
import { DialogAddTaskService } from '../../shared/services/dialog-add-task.service';
import { DialogViewTaskComponent } from './dialog-view-task/dialog-view-task.component';
import { DialogViewTaskService } from '../../shared/services/dialog-view-task.service';
import { DialogEditContactComponent } from './dialog-edit-contact/dialog-edit-contact.component';
import { DialogEditContactService } from '../../shared/services/dialog-edit-contact.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MenuComponent,
    DialogAddTaskComponent,
    CommonModule,
    DialogViewTaskComponent,
    DialogEditContactComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  joinData: JoinService = inject(JoinService);
  userData: UserService = inject(UserService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);
  asToData: AssignedToService = inject(AssignedToService);
  subTData: SubtaskService = inject(SubtaskService);
  datData: DialogAddTaskService = inject(DialogAddTaskService);
  dvtData: DialogViewTaskService = inject(DialogViewTaskService);
  decData: DialogEditContactService = inject(DialogEditContactService);

  mainToken: any;
  sid: any;
  user = new User();
  users: User[] = [];

  // create own function!!!
  async ngOnInit() {
    await this.setMainToken();
    this.sid = this.mainToken;
    console.log('summary sid: ', this.sid);

    await this.userData.getUsers();
    this.users = this.userData.users;
    let user = this.users.find((u) => u.sid == this.sid);
    if (user) {
      this.user = user;
      console.log('summary user: ', this.user);
      console.log('user task summary: ', this.user.taskSummary);
    }
    this.userData.setUser(this.user);
  }

  async setMainToken() {
    this.mainToken = await this.getUserToken();
    console.log('main token: ', this.mainToken);
  }

  async getUserToken() {
    const userToken = this.route.snapshot.paramMap.get('id');
    console.log('main router user token: ', userToken);
    return userToken;
  }
}
