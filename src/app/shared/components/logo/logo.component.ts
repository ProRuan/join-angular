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

  @Input() animated: boolean = true;

  pointless: boolean = false;
  logo: string = '../../../assets/img/login/logo.png';

  /**
   * Initializes a logo component.
   */
  ngOnInit() {
    this.introduce();
  }

  /**
   * Introduces the app by animation.
   */
  introduce() {
    let welcomed = this.animated && !this.join.revealed;
    welcomed ? this.playIntro() : this.skipIntro();
  }

  /**
   * Plays the intro.
   */
  playIntro() {
    setTimeout(() => (this.join.revealed = true), 0);
    setTimeout(() => (this.join.relocated = true), 0);
    setTimeout(() => (this.pointless = true), 800);
  }

  /**
   * Skips the intro.
   */
  skipIntro() {
    this.pointless = true;
  }

  /**
   * Reveals the app by animation.
   * @returns The animation state.
   */
  revealApp() {
    if (this.animated) {
      return !this.join.revealed ? revelation.start : revelation.end;
    } else {
      return revelation.end;
    }
  }

  /**
   * Sets the style of the pointer-events.
   * @returns The style of the pointer-events.
   */
  getPointerEventStyle() {
    let propertyA = { 'pointer-events': 'none' };
    let propertyB = { 'pointer-events': 'auto' };
    return this.pointless ? propertyA : propertyB;
  }

  /**
   * Gets the css class of the logo background-color.
   * @returns The css class of the logo background-color.
   */
  getBgcClass() {
    return this.join.revealed ? 'bg-transparent' : 'bg-color';
  }

  /**
   * Relocates the logo by animation.
   * @returns The animation state.
   */
  relocateLogo() {
    if (this.animated) {
      return !this.join.relocated ? relocation.start : relocation.end;
    } else {
      return relocation.end;
    }
  }

  /**
   * Gets the css class of the logo position.
   * @returns The css class of the logo position.
   */
  getPosClass() {
    return this.join.relocated ? 'pos-top-left' : 'pos-center';
  }
}
