import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BoardService } from '../../../shared/services/board.service';

@Component({
  selector: 'app-board-head',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-head.component.html',
  styleUrl: './board-head.component.scss',
})

/**
 * Class representing a board head component.
 */
export class BoardHeadComponent {
  board: BoardService = inject(BoardService);

  heads: string[] = ['To do', 'In progress', 'Await feedback', 'Done'];

  /**
   * Verifies the display state of an add button.
   * @param head - The head name.
   * @returns A boolean value.
   */
  isDisplayed(head: string) {
    return head !== 'Done';
  }

  /**
   * Opens an add-task form on click.
   */
  onAdd() {
    this.board.onAdd();
  }
}
