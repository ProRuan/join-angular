import { Component, Input } from '@angular/core';
import { MainLink } from '../../../../classes/main-link';

@Component({
  selector: 'app-main-link',
  standalone: true,
  imports: [],
  templateUrl: './main-link.component.html',
  styleUrl: './main-link.component.scss',
})
export class MainLinkComponent {
  @Input() link = new MainLink();
}
