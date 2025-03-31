import { trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { desktopLogoAnimation } from '../../animations/desktop-logo.animation';
import { mobileLogoAnimation } from '../../animations/mobile-logo.animation';
import { LogoSvgComponent } from '../svg/logo-svg/logo-svg.component';
import { JoinService } from '../../services/join.service';
import { getSessionalItem } from '../../ts/global';

const logoAnimation = getLogoAnimation();

/**
 * Gets a logo animation.
 * @returns The logo animation.
 */
function getLogoAnimation() {
  let animation = getResponsiveAnimation();
  return trigger('logoAnimation', animation.definitions);
}

/**
 * Gets a responsive animation depending on the used device.
 * @returns The responsive animation.
 */
function getResponsiveAnimation() {
  return window.innerWidth > 1180 ? desktopLogoAnimation : mobileLogoAnimation;
}

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, LogoSvgComponent],
  animations: [logoAnimation],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})

/**
 * Class representing a logo component.
 */
export class LogoComponent {
  join: JoinService = inject(JoinService);

  @Input() animated: boolean = true;

  logo: string = '../../../assets/img/login/logo.png';
  started: boolean = false;

  /**
   * Initializes a logo component.
   */
  ngOnInit() {
    let introDone = getSessionalItem('introDone');
    if (introDone) {
      this.setDone();
    }
  }

  /**
   * Verifies the disabled state of a logo animation.
   * @returns A boolean value.
   */
  isDisabled() {
    return !this.animated || this.join.introDone;
  }

  /**
   * Sets an intro to started.
   */
  setStarted() {
    setTimeout(() => {
      this.started = true;
    }, 0);
  }

  /**
   * Sets an intro to done.
   */
  setDone() {
    this.join.setIntroToDone();
  }
}
