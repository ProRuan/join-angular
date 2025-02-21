import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { JoinService } from '../../shared/services/join.service';
import { Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { DialogEditContactComponent } from './dialog-edit-contact/dialog-edit-contact.component';
import { DialogEditContactService } from '../../shared/services/dialog-edit-contact.service';
import { DialogAddContactComponent } from './dialog-add-contact/dialog-add-contact.component';
import { DialogAddContactService } from '../../shared/services/dialog-add-contact.service';
import { JoinHeaderComponent } from '../../shared/components/join-header/join-header.component';
import { DialogService } from '../../shared/services/dialog.service';
import { BoardService } from '../../shared/services/board.service';
import { DialogComponent } from '../dialog/dialog.component';
import { FlipMenuComponent } from '../../shared/components/flip-menu/flip-menu.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    JoinHeaderComponent,
    CommonModule,
    DialogComponent,
    FlipMenuComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  join: JoinService = inject(JoinService);
  board: BoardService = inject(BoardService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);
  dialog: DialogService = inject(DialogService);
  decData: DialogEditContactService = inject(DialogEditContactService);
  dacData: DialogAddContactService = inject(DialogAddContactService);

  // MenuComponent
  // -------------
  // Appearance of guest version ... !

  // FlipMenuComponent
  // -----------------
  // rename task-icon to add-task-icon ... ?
  // set links with target:_blank ... (1-3)

  // check routes.ts ...
  // check dialog.service.ts ...

  // set currentLink (this.router.url) ...
  // destroy all children components for flipMenu at least ...
  // add user log out method ...

  mainToken: any;
  sid: any;
  // user = new User();
  // users: User[] = [];

  // create own function!!!
  async ngOnInit() {
    await this.join.loadUser();
    this.join.subscribeUser();
    // const sid = this.route.snapshot.paramMap.get('id');
    // console.log('main user sid: ', sid);
    // new
    // ---
    // if (sid) {
    //   let user = await this.join.getUserBySid(sid);
    //   if (user) {
    //     console.log('main user: ', user);
    //   }
    // }
    // old
    // ---
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

  onDragend() {
    if (this.board.dragStarted) {
      this.board.setDrag();
    }
  }
}
