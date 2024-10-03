import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
  @Input() revealed: boolean;
  logo: string;
  bgColor: string;
  posCenter: string;

  /**
   * Creates a join logo component.
   */
  constructor() {
    this.revealed = false;
    this.logo = '../../../assets/img/login/logo.png';
    this.bgColor = 'bg-color';
    this.posCenter = 'pos-center';
  }

  /**
   * Initializes the join logo component.
   */
  ngOnInit() {
    this.setClasses();
    this.reveal();
  }

  /**
   * Sets the intro classes.
   */
  setClasses() {
    this.bgColor = !this.revealed ? 'bg-color' : '';
    this.posCenter = !this.revealed ? 'pos-center' : '';
  }

  /**
   * Reveals the login component.
   */
  reveal() {
    if (!this.revealed) {
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
      this.revealed = true;
    }, 1000);
  }

  /**
   * Provides an animation class.
   * @param className - The animation class.
   * @returns - The animation class.
   */
  animate(className: string) {
    return !this.revealed ? className : '';
  }
}
