import { computed, effect, inject } from '@angular/core';
import { getState, patchState, signalStore, watchState, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { withLogger } from './features/logger.feature';
import { setPending, setFulfilled, withRequestStatus, setError } from './features/request-status.feature';
import { addEntity, withEntities } from '@ngrx/signals/entities';

type BooksState = {
	books: Book[];
	isLoading: boolean;
	filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BooksState = {
	books: [],
	isLoading: false,
	filter: { query: '', order: 'asc' },
};

export const BooksStore = signalStore(
	{
		providedIn: 'root',
		protectedState: false
	},
	// withEntities<Book>(),
	withState(initialState),
	withProps(() => ({
		booksService: inject(BooksService),
	})),
	withComputed(({ books, filter }) => ({
		booksCount: computed(() => books().length),
		sortedBooks: computed(() => {
			const direction = filter.order() === 'asc' ? 1 : -1;
			return books().slice().sort((a, b) =>
				direction * a.title.localeCompare(b.title)
			);
		}),
	})),
	withRequestStatus(),
	withMethods(({ booksService, ...store }) => ({
		updateQuery(query: string): void {
			patchState(store, (state) => ({ filter: { ...state.filter, query } }));
		},
		updateOrder(order: 'asc' | 'desc'): void {
			patchState(store, (state) => ({ filter: { ...state.filter, order } }));
		},
		async loadAll(): Promise<void> {
			patchState(store, { isLoading: true }, setPending());
			const books = await booksService.getBooks();
			const filter = store.filter();
			patchState(store, { books, isLoading: false, filter: { ...filter, query: '' } }, setFulfilled());
		},
		loadByQuery: rxMethod<string>(
			pipe(
				tap(() => patchState(store, { isLoading: true }, setPending())),
				switchMap((query) => {
					return booksService.getBooksByQuery(query).pipe(
						tapResponse({
							next: (books) => {
								const filter = store.filter();
								patchState(store, { books, isLoading: false, filter: { ...filter, query } }, setFulfilled());
							},
							error: (err : any) => {
								patchState(store, { isLoading: false }, setError(err));
								console.log(err);
							}
						})
					)
				})
			)
		),
		// addBook(book : Book): void {
		// 	patchState(store, addEntity(book));
		// }
	})),
	withLogger('Books'),
	// withHooks({
	// 	onInit(store) {
	// 		console.log('BooksStore initialized');
	// 		watchState(store, (state) => {
	// 			console.log('[watchState] ', state);
	// 		});
	// 		effect(() => {
	// 			const state = getState(store);
	// 			console.log('[Current State]', state);
	// 		});
	// 	},
	// 	onDestroy() {
	// 		console.log('BooksStore destroyed');
	// 	},
	// }),
);