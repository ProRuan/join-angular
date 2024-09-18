import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainComponent } from './components/main/main.component';
import { SummaryComponent } from './components/summary/summary.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { BoardComponent } from './components/board/board.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { HelpComponent } from './components/help/help.component';

export const routes: Routes = [
  // redirect to login!!!
  // rename (double) components!!!
  // rename MainComponent to JoinComponent?!?
  // add PageNotFound component!!! (also for children)
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'main/:id',
    component: MainComponent,
    children: [
      { path: 'summary', component: SummaryComponent },
      { path: 'add-task', component: AddTaskComponent },
      { path: ':id/board', component: BoardComponent },
      { path: ':id/contacts', component: ContactsComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'legal-notice', component: LegalNoticeComponent },
      { path: 'help', component: HelpComponent },
      { path: '', redirectTo: ':id/summary', pathMatch: 'full' },
      { path: '**', redirectTo: 'summary' },
    ],
  },
  // { path: '**', redirectTo: 'login' },
];
