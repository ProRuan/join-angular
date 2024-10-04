import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { JoinService } from '../../services/join.service';
import { revelation } from './animations/revelation.animation';
import { relocation } from './animations/relocation.animation';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  animations: [revelation.trigger(), relocation.trigger()],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})

/**
 * Represents a logo component.
 */
export class LogoComponent {
  join: JoinService = inject(JoinService);

  @Input() enabled: boolean = true;
  pointless: boolean = false;
  logo: string = '../../../assets/img/login/logo.png';

  /**
   * Initializes a logo component.
   */
  ngOnInit() {
    let welcomed = this.enabled && !this.join.revealed;
    welcomed ? this.playIntro() : this.skipIntro();
  }

  /**
   * Plays the intro.
   */
  playIntro() {
    setTimeout(() => (this.join.revealed = true), 0);
    setTimeout(() => (this.join.relocated = true), 0);
    setTimeout(() => (this.pointless = true), 1000);
  }

  /**
   * Skips the intro.
   */
  skipIntro() {
    this.pointless = true;
  }

  /**
   * Reveals the app.
   * @returns - The animation state.
   */
  revealApp() {
    if (this.enabled) {
      return !this.join.revealed ? revelation.start : revelation.end;
    } else {
      return revelation.end;
    }
  }

  /**
   * Sets the template to pointless.
   * @returns - The property to set.
   */
  setPointless() {
    let propertyA = { 'pointer-events': 'none' };
    let propertyB = { 'pointer-events': 'auto' };
    return this.pointless ? propertyA : propertyB;
  }

  /**
   * Colors the background.
   * @returns - The class to apply.
   */
  colorBg() {
    return !this.join.revealed ? 'bg-color' : '';
  }

  /**
   * Relocates the logo.
   * @returns - The animation state.
   */
  relocateLogo() {
    if (this.enabled) {
      return !this.join.relocated ? relocation.start : relocation.end;
    } else {
      return relocation.end;
    }
  }

  /**
   * Centers the logo.
   * @returns - The class to apply.
   */
  centerLogo() {
    return !this.join.relocated ? 'pos-center' : '';
  }
}
