import { trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { mobileLogoAnimation } from '../../animations/mobile-logo.animation';
import { desktopLogoAnimation } from '../../animations/logo.animation';
import { LogoSvgComponent } from './logo-svg/logo-svg.component';
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
  return window.innerWidth < 429 ? mobileLogoAnimation : desktopLogoAnimation;
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

  /**
   * Initializes a logo component.
   */
  ngOnInit() {
    let introDone = getSessionalItem('introDone');
    if (introDone) {
      this.setIntroToDone();
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
   * Sets an intro to done.
   */
  setIntroToDone() {
    this.join.setIntroToDone();
  }
}
