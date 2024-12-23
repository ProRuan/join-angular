import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SubtaskService } from '../../services/subtask.service';
import { BasicInput, getProvider } from '../../models/basic-input';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-subtasks-input',
  standalone: true,
  imports: [CommonModule, FormsModule, LabelComponent],
  templateUrl: './subtasks-input.component.html',
  styleUrl: './subtasks-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, SubtasksInputComponent),
    getProvider(NG_VALUE_ACCESSOR, SubtasksInputComponent),
  ],
})
export class SubtasksInputComponent extends BasicInput {
  subTData: SubtaskService = inject(SubtaskService);

  // create default tasks
  // create default contacts
  // create default subtasks

  // Style
  // -----
  // position:absolute, because height is changing!!!
  // button hover animation!!!

  // set subtask cont height limit?!

  // jsdoc
  onEmptyInput() {
    this.empty();
  }

  // jsdoc
  empty() {
    this.value = '';
  }

  // verify subtask service!
  onAddSubtask() {
    this.subTData.add(this.value);
    this.empty();
  }

  stop(event: Event) {
    event.stopPropagation();
  }
}
