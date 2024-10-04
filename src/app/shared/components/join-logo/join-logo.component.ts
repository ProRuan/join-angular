import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { JoinService } from '../../services/join.service';
import { revelation } from './animations/revelation.animation';
import { relocation } from './animations/relocation.animation';

@Component({
  selector: 'app-join-logo',
  standalone: true,
  imports: [CommonModule],
  animations: [revelation, relocation],
  templateUrl: './join-logo.component.html',
  styleUrl: './join-logo.component.scss',
})

/**
 * Represents a join logo component.
 */
export class JoinLogoComponent {
  join: JoinService = inject(JoinService);

  @Input() enabled: boolean = true;
  logo: string = '../../../assets/img/login/logo.png';

  /**
   * Initializes a join logo component.
   */
  ngOnInit() {
    if (this.enabled) {
      this.setTrue('revealed');
      this.setTrue('relocated');
    }
  }

  /**
   * Sets a value to true.
   * @param key - The key of the value.
   */
  setTrue(key: string) {
    setTimeout(() => {
      this.join[key] = true;
    }, 0);
  }

  /**
   * Colors the background.
   * @returns - A class name.
   */
  colorBg() {
    return !this.join.revealed ? 'bg-color' : '';
  }

  /**
   * Centers the logo.
   * @returns - A class name.
   */
  centerLogo() {
    return !this.join.relocated ? 'pos-center' : '';
  }

  /**
   * Reveals the app.
   * @returns - The state of the revelation.
   */
  revealApp() {
    if (this.enabled) {
      return !this.join.revealed ? 'revelation-start' : 'revelation-end';
    } else {
      return 'revelation-end';
    }
  }

  /**
   * Relocates the logo.
   * @returns - The state of the relocation.
   */
  relocateLogo() {
    if (this.enabled) {
      return !this.join.relocated ? 'relocation-start' : 'relocation-end';
    } else {
      return 'relocation-end';
    }
  }
}
