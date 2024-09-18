import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { JoinService } from '../../shared/services/join.service';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  joinData: JoinService = inject(JoinService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);

  mainToken: any;

  async ngOnInit() {
    this.mainToken = await this.getUserToken();
    console.log('main token: ', this.mainToken);
  }

  async getUserToken() {
    const userToken = this.route.snapshot.paramMap.get('id');
    console.log('main router user token: ', userToken);
    return userToken;
  }
}
