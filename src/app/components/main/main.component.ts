import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { JoinHeaderComponent } from '../../shared/components/join-header/join-header.component';
import { FlipMenuComponent } from '../../shared/components/flip-menu/flip-menu.component';
import { MobileMenuComponent } from '../../shared/components/mobile-menu/mobile-menu.component';
import { Firestore } from '@angular/fire/firestore';
import { JoinService } from '../../shared/services/join.service';
import { BoardService } from '../../shared/services/board.service';
import { DialogService } from '../../shared/services/dialog.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { unsubscribe } from '../../shared/ts/global';

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

/**
 * Class representing a main component.
 */
export class MainComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  firestore: Firestore = inject(Firestore);
  join: JoinService = inject(JoinService);
  board: BoardService = inject(BoardService);
  dialogs: DialogService = inject(DialogService);
  nav: NavigationService = inject(NavigationService);

  loadingSubscription: Subscription | null = null;

  /**
   * Initializes a main component.
   */
  ngOnInit() {
    this.join.loadUser();
    this.loadUsers();
    this.setGreetingToDone();
    this.join.setIntroToDone();
  }

  /**
   * Loads users.
   */
  loadUsers() {
    if (this.join.users.length < 1) {
      this.loadUserCollection();
      this.join.subscribeUserCollection();
    }
  }

  /**
   * Loads a user collection.
   */
  loadUserCollection() {
    this.join.loaded$.subscribe({
      next: (loaded) => this.loadLoggedInUser(loaded),
      error: (error) => console.log('Error - Could not load users: ', error),
    });
  }

  /**
   * Loads a logged in user.
   * @param loaded - A boolean value.
   */
  loadLoggedInUser(loaded: boolean) {
    if (loaded) {
      this.join.unsubscribeUserCollection();
      let sid = this.route.snapshot.paramMap.get('id');
      this.join.loadUser(sid);
    }
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

  /**
   * Closes all add-task menus on click.
   */
  closeAddTaskMenus() {
    this.dialogs.resetAssignedTo();
    this.dialogs.close('category');
    this.dialogs.close('subtask');
  }

  /**
   * Ends a task drag on dragend.
   */
  onDragend() {
    if (this.board.dragStarted) {
      this.board.setDrag();
    }
  }

  /**
   * Destroys a main component.
   */
  ngOnDestroy() {
    unsubscribe(this.loadingSubscription);
    this.join.unsubscribeUser();
    this.join.user.set();
  }
}
