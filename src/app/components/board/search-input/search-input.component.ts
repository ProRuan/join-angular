import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasicInput, getProvider } from '../../../shared/models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, SearchInputComponent),
    getProvider(NG_VALUE_ACCESSOR, SearchInputComponent),
  ],
})

/**
 * Represents a search input component.
 * @extends - The BasicInput.
 */
export class SearchInputComponent extends BasicInput {
  @Input() override value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Updates the value on event.
   * @param delayed - A boolean value.
   */
  onUpdate(delayed: boolean = false) {
    delayed ? setTimeout(() => this.update(), 0) : this.update();
  }

  /**
   * Updates the value.
   */
  update() {
    let value = this.value.toLowerCase();
    this.valueChange.emit(value);
  }
}
