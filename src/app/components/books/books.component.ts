import { Component, inject, Injector } from '@angular/core';
import { BooksStore } from '../../ngrx/signals/book.store';
import { JsonPipe } from '@angular/common';
import { patchState, watchState } from '@ngrx/signals';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-books',
    imports: [JsonPipe],
    templateUrl: './books.component.html',
    styleUrl: './books.component.scss'
})
export class BooksComponent {
    readonly bookStore = inject(BooksStore);
    private readonly injector = inject(Injector);

    constructor(private bookService: BooksService, private router: Router) { }

    ngOnInit(): void {
        this.onGetAll();

        watchState(this.bookStore, (val) => console.log('[Watch State]', val), {
            injector: this.injector,
        });

    }

    onGetAll() {
        this.bookStore.loadAll();
    }

    onGetByQuery(query: string) {
        this.bookStore.loadByQuery(query, { injector: this.injector });
    }

    onSort() {
        this.bookStore.updateOrder(this.bookStore.filter.order() === 'asc' ? 'desc' : 'asc')
    }

    onAddBook() {
        const book = {
            id: this.bookStore.booksCount() + 1,
            title: 'Test book'
        }
        patchState(this.bookStore, state => ({
            books: [...state.books, book]
        }));
        // this.store.addBook(book);
    }

    goToCollection() {
        this.router.navigate(['/collection']);
    }
}
