import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-link.component.html',
  styleUrl: './main-link.component.scss',
})
export class MainLinkComponent {
  @Input() link: any;

  setActive() {
    return this.link.active ? 'active' : '';
  }
}
