import { Component, inject } from '@angular/core';
import { DialogService } from '../../shared/services/dialog.service';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../shared/services/board.service';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { DeleteContactDialogComponent } from './delete-contact-dialog/delete-contact-dialog.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  dialog: DialogService = inject(DialogService);
  board: BoardService = inject(BoardService);
}
