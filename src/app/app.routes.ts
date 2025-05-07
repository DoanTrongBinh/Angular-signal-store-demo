import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';

export const routes: Routes = [
    { path: '', component: BooksComponent },
    { path: 'collection', loadChildren: () => import('./components/pages/collection/collection.module').then(m => m.CollectionModule) },
];
