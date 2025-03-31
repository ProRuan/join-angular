import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { MainComponent } from './components/main/main.component';
import { SummaryComponent } from './components/summary/summary.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { BoardComponent } from './components/board/board.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { HelpComponent } from './components/help/help.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'new-password', component: NewPasswordComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'legal-notice', component: LegalNoticeComponent },
    ],
  },
  {
    path: 'main/:id',
    component: MainComponent,
    children: [
      { path: 'summary', component: SummaryComponent },
      { path: 'add-task', component: AddTaskComponent },
      { path: 'board', component: BoardComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'help', component: HelpComponent },
      { path: 'legal-notice', component: LegalNoticeComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: ':id', redirectTo: ':id/summary', pathMatch: 'full' },
      { path: '**', redirectTo: 'summary' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
