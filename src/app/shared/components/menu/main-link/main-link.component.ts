import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-link',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main-link.component.html',
  styleUrl: './main-link.component.scss',
})
export class MainLinkComponent {
  @Input() link: any;

  getId() {
    let id = this.link.text.toLowerCase();
    return id.includes(' ') ? id.replace(' ', '-') : id;
  }

  setActive() {
    return this.link.active ? 'active' : '';
  }
}
