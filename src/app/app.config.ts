import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { booksReducer } from './ngrx/store/reducers/books.reducer';
import { collectionReducer } from './ngrx/store/reducers/collection.reducer';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore({ books: booksReducer, collection: collectionReducer }),
    provideHttpClient()
  ]
};
