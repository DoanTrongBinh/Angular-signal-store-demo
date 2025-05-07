import { createReducer, on } from "@ngrx/store";
import { GoogleBook } from "../../../models/book.model";
import { BooksApiActions } from "../actions/books.action";

export const initialState: ReadonlyArray<GoogleBook> = [];

export const booksReducer = createReducer(
    initialState,
    on(BooksApiActions.retrievedBookList, (_state, { books }) => books)
);