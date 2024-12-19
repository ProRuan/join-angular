import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { PrioService } from '../../services/prio.service';
import { getCapitalized } from '../../ts/global';

@Component({
  selector: 'app-prio-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prio-button.component.html',
  styleUrl: './prio-button.component.scss',
})

/**
 * Represents a prio button component.
 */
export class PrioButtonComponent {
  prio: PrioService = inject(PrioService);

  @Input() id: string = 'urgent';
  name: string = 'Urgent';
  img: string = 'prio_urgent';
  src: string = '';

  /**
   * Initializes the prio button.
   */
  ngOnInit() {
    this.name = this.getName();
    this.img = this.getImage();
    this.src = this.getSrc();
  }

  /**
   * Provides the prio button name.
   * @returns - The prio button name.
   */
  getName() {
    return getCapitalized(this.id);
  }

  /**
   * Provides the prio button image.
   * @returns - The prio button image.
   */
  getImage() {
    return `prio_${this.id}`;
  }

  /**
   * Provides the source path.
   * @returns - The source path.
   */
  getSrc() {
    return `../../../assets/img/add-task/${this.img}.png`;
  }

  /**
   * Verifies the disabled state of the prio button.
   * @returns - A boolean value.
   */
  isDisabled() {
    return this.prio.get(this.id);
  }

  /**
   * Selects the prio button on click.
   */
  onSelect() {
    this.prio.clear();
    this.prio.set(this.id);
  }
}
