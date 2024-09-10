import { Component, inject } from '@angular/core';
import { MainLinkComponent } from './main-link/main-link.component';
import { LinkService } from '../../services/link.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MainLinkComponent, CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  public linkData: LinkService = inject(LinkService);

  mainLinks = this.linkData.mainLinks;
}
