import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
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
import { DocSnap } from '../../shared/ts/type';

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

  subscriptions = new Subscription();

  /**
   * Initializes a main component.
   */
  ngOnInit() {
    this.setLoggedInUser();
    this.setGreetingToDone();
    this.join.setIntroToDone();
  }

  /**
   * Sets a logged in user.
   */
  setLoggedInUser() {
    this.subscriptions.add(
      this.route.paramMap.subscribe((params) => this.updateContent(params))
    );
  }

  /**
   * Updates the content to be displayed.
   * @param params - The param map.
   */
  updateContent(params: ParamMap) {
    this.updateUser(params);
    this.nav.updateLoginState();
  }

  /**
   * Updates a user.
   * @param params - The param map.
   */
  updateUser(params: ParamMap) {
    let id = params.get('id');
    if (this.join.isGuestAccount(id)) {
      this.join.setGuest();
      this.join.loadedSubject.next(true);
    } else if (id) {
      this.setUserById(id);
    }
  }

  /**
   * Sets a user by user id.
   * @param id - The user id.
   */
  setUserById(id: string) {
    this.join.getUserById(id).subscribe({
      next: (userSnap) => this.setUser(userSnap),
      error: (error) => console.log('Error - Could not get user: ', error),
    });
  }

  /**
   * Sets a user.
   * @param userSnap - The user document snapshot.
   */
  setUser(userSnap: DocSnap) {
    let data = this.join.getUserDataBySnap(userSnap);
    if (data) {
      this.join.user.set(data);
      this.join.loadedSubject.next(true);
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
    this.join.user.set();
    this.subscriptions.unsubscribe();
  }
}
