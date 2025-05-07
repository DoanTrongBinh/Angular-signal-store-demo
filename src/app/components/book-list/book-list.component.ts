import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GoogleBook } from '../../models/book.model';

@Component({
	selector: 'app-book-list',
	imports: [],
	templateUrl: './book-list.component.html',
	styleUrl: './book-list.component.scss'
})
export class BookListComponent {
	@Input() books: ReadonlyArray<GoogleBook> = [];
	@Output() add = new EventEmitter<string>();

	handleAddToCollection(bookId: string) {
		this.add.emit(bookId);
	}
}
