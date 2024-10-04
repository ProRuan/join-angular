import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'join-angular-708af',
          appId: '1:953154306638:web:350df55405496ab01df91f',
          storageBucket: 'join-angular-708af.appspot.com',
          apiKey: 'AIzaSyBuo8gX0nO1BJWLUnj_FOAVxy5mCmpJjZc',
          authDomain: 'join-angular-708af.firebaseapp.com',
          messagingSenderId: '953154306638',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideAnimations(),
  ],
};
