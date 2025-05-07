import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GoogleBook } from '../../models/book.model';

@Component({
	selector: 'app-book-collection',
	imports: [],
	templateUrl: './book-collection.component.html',
	styleUrl: './book-collection.component.scss'
})
export class BookCollectionComponent {
	@Input() books: ReadonlyArray<GoogleBook> = [];
	@Output() remove = new EventEmitter<string>();

	handleRemoveCollection(bookId : string) {
		this.remove.emit(bookId);
	}
}
