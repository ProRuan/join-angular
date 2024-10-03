import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { JoinService } from '../../services/join.service';

@Component({
  selector: 'app-join-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './join-logo.component.html',
  styleUrl: './join-logo.component.scss',
})

/**
 * Represents a join logo component.
 */
export class JoinLogoComponent {
  join: JoinService = inject(JoinService);

  @Input() enabled: boolean = true;
  logo: string;
  bgColor: string;
  posCenter: string;

  /**
   * Creates a join logo component.
   */
  constructor() {
    this.logo = '../../../assets/img/login/logo.png';
    this.bgColor = '';
    this.posCenter = '';
  }

  /**
   * Initializes the join logo component.
   */
  ngOnInit() {
    if (this.enabled) {
      this.setClasses();
      this.reveal();
    }
  }

  /**
   * Sets the intro classes.
   */
  setClasses() {
    this.bgColor = !this.join.revealed ? 'bg-color' : '';
    this.posCenter = !this.join.revealed ? 'pos-center' : '';
  }

  /**
   * Reveals the login component.
   */
  reveal() {
    if (!this.join.revealed) {
      this.clearClasses();
      this.setRevealed();
    }
  }

  /**
   * Clears the initial classes.
   */
  clearClasses() {
    setTimeout(() => {
      this.bgColor = '';
      this.posCenter = '';
    }, 900);
  }

  /**
   * Denotes the intro as done.
   */
  setRevealed() {
    setTimeout(() => {
      this.join.revealed = true;
    }, 1000);
  }

  /**
   * Provides an animation class.
   * @param className - The animation class.
   * @returns - The animation class.
   */
  animate(className: string) {
    if (this.enabled) {
      return !this.join.revealed ? className : '';
    } else {
      return '';
    }
  }
}
