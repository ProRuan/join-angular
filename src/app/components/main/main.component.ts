import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { JoinService } from '../../shared/services/join.service';
import { Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { JoinHeaderComponent } from '../../shared/components/join-header/join-header.component';
import { DialogService } from '../../shared/services/dialog.service';
import { BoardService } from '../../shared/services/board.service';
import { FlipMenuComponent } from '../../shared/components/flip-menu/flip-menu.component';
import { MobileMenuComponent } from '../../shared/components/mobile-menu/mobile-menu.component';
import { NavigationService } from '../../shared/services/navigation.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    JoinHeaderComponent,
    CommonModule,
    FlipMenuComponent,
    MobileMenuComponent,
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
  nav: NavigationService = inject(NavigationService);

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

  // create own function!!!
  ngOnInit() {
    this.setGreetingToDone();
    this.join.loadUser();
    this.join.subscribeUser();
    this.join.setIntroToDone();
  }

  /**
   * Sets a greeting to done.
   */
  setGreetingToDone() {
    if (!this.isSummary()) {
      this.join.setGreetingToDone();
    }
  }

  /**
   * Verifies a summary component.
   * @returns A boolean value.
   */
  isSummary() {
    return this.nav.isLinkActivated('summary');
  }

  onDragend() {
    if (this.board.dragStarted) {
      this.board.setDrag();
    }
  }

  ngOnDestroy() {
    this.join.unsubscribeUser();
    this.join.user.set();
  }
}
