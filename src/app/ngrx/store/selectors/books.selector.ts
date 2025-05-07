import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GoogleBook } from "../../../models/book.model";

export const selectBooks = createFeatureSelector<ReadonlyArray<GoogleBook>>('books');

export const selectCollectionState = createFeatureSelector<ReadonlyArray<string>>('collection');

export const selectBookCollection = createSelector(
    selectBooks,
    selectCollectionState,
    (books, collection) => {
        return collection.map((id) => books.find(book => book.id === id)!);
    }
);