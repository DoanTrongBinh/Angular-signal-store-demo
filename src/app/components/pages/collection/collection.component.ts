import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksService } from '../../../services/books.service';
import { BooksActions, BooksApiActions } from '../../../ngrx/store/actions/books.action';
import { selectBooks, selectBookCollection } from '../../../ngrx/store/selectors/books.selector';
import { Observable } from 'rxjs';
import { GoogleBook } from '../../../models/book.model';
import { BookCollectionComponent } from '../../book-collection/book-collection.component';
import { BookListComponent } from '../../book-list/book-list.component';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-collection',
	imports: [BookCollectionComponent, BookListComponent, AsyncPipe],
	templateUrl: './collection.component.html',
	styleUrl: './collection.component.scss'
})
export class CollectionComponent {
	books$!: Observable<readonly GoogleBook[]>;
	bookCollection$!: Observable<GoogleBook[]>;

	onAdd(bookId: string) {
		this.store.dispatch(BooksActions.addBook({ bookId }));
	}

	onRemove(bookId: string) {
		this.store.dispatch(BooksActions.removeBook({ bookId }));
	}

	constructor(private booksService: BooksService, private store: Store) { }

	ngOnInit() {
		this.booksService
			.getGoogleBooks()
			.subscribe((books) =>
				this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
			);

		this.books$ = this.store.select(selectBooks);
		this.bookCollection$ = this.store.select(selectBookCollection);
	}
}
