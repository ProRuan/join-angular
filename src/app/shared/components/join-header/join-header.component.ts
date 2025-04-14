import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JoinService } from '../../services/join.service';
import { DialogService } from '../../services/dialog.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-join-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './join-header.component.html',
  styleUrl: './join-header.component.scss',
})

/**
 * Class representing a join header component.
 */
export class JoinHeaderComponent {
  join: JoinService = inject(JoinService);
  dialogs: DialogService = inject(DialogService);
  nav: NavigationService = inject(NavigationService);

  src: string = '../../../../assets/img/header/help.png';
  dialogId: string = 'flipMenu';

  /**
   * Verifies the display state of a button group.
   * @returns A boolean value.
   */
  isButtonGroupDisplayed() {
    let mobile = this.join.loggedIn && this.join.isMobile();
    let desktop = !this.isLegalTextComponent();
    return mobile || desktop;
  }

  /**
   * Verifies a legal text component.
   * @returns A boolean value.
   */
  isLegalTextComponent() {
    return this.isLink('legal-notice') || this.isLink('privacy-policy');
  }

  /**
   * Verifies a link.
   * @param id - The link id.
   * @returns A boolean value.
   */
  isLink(id: string) {
    return this.nav.isLinkActivated(id);
  }

  /**
   * Verifies the display state of a help component.
   * @returns A boolean value.
   */
  isHelpDisplayed() {
    return !this.join.isMobile() && !this.isLink('help');
  }

  /**
   * Switches a menu on click.
   */
  onSwitch() {
    this.dialogs.switch(this.dialogId);
  }
}
