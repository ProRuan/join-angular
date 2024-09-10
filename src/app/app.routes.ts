import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';

export const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: '**', redirectTo: '' },
];
