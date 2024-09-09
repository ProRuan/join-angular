import { Component, inject } from '@angular/core';
import { MainLinkComponent } from './main-link/main-link.component';
import { LinkService } from '../../services/link.service';
import { CommonModule } from '@angular/common';
import { MainLink } from '../../../classes/main-link';
import { MainLinkSource } from '../../interfaces/main-link-source';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MainLinkComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  public linkData: LinkService = inject(LinkService);

  mainLinks: MainLinkSource[];

  constructor() {
    this.mainLinks = this.linkData.mainLinks;
  }

  setMainLink(link: MainLinkSource) {
    return new MainLink(link);
  }
}
