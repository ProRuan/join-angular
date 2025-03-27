import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LabelComponent } from '../../label/label.component';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { PrioButton } from '../../../interfaces/prio-button';
import { getCapitalized } from '../../../ts/global';

@Component({
  selector: 'app-prio-input',
  standalone: true,
  imports: [CommonModule, LabelComponent],
  templateUrl: './prio-input.component.html',
  styleUrl: './prio-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, PrioInputComponent),
    getProvider(NG_VALUE_ACCESSOR, PrioInputComponent),
  ],
})

/**
 * Class representing a prio input component.
 * @extends ReactiveInput
 */
export class PrioInputComponent extends ReactiveInput {
  @Input() override control: AbstractControl | null = null;
  @Input() mobile: boolean = false;

  prios: string[] = ['urgent', 'medium', 'low'];
  buttons: PrioButton[] = [];

  /**
   * Initializes a prio input component.
   */
  ngOnInit() {
    this.setButtons();
  }

  /**
   * Sets prio buttons.
   */
  setButtons() {
    this.buttons = this.prios.map((prio) => this.getButton(prio));
  }

  /**
   * Gets a prio button.
   * @param prio - The prio.
   * @returns The prio button.
   */
  getButton(prio: string) {
    return {
      id: prio,
      name: this.getName(prio),
      img: this.getImage(prio),
      src: this.getSource(prio),
    };
  }

  /**
   * Gets a prio name.
   * @param prio - The prio.
   * @returns The prio name.
   */
  getName(prio: string) {
    return getCapitalized(prio);
  }

  /**
   * Gets a prio image.
   * @param prio - The prio.
   * @returns The prio image.
   */
  getImage(prio: string) {
    return `prio_${prio}`;
  }

  /**
   * Gets a prio source path.
   * @param prio - The prio.
   * @returns The prio source path.
   */
  getSource(prio: string) {
    return `/assets/img/add-task/prio_${prio}.png`;
  }

  /**
   * Gets the css class of a button group.
   * @returns The css class of the button group.
   */
  getHeightClass() {
    return this.mobile ? 'h-fit' : 'h-61';
  }

  /**
   * Verifies the disabled state of a prio button.
   * @param prio - The prio.
   * @returns A boolean value.
   */
  isDisabled(prio: string) {
    return prio == this.value;
  }

  /**
   * Sets the prio on click.
   * @param prio - The prio to set.
   */
  onClick(prio: string) {
    this.value = prio;
    this.markAsDirty(this.control);
  }
}
