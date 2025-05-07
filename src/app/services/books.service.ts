import { Injectable } from '@angular/core';
import { Book, GoogleBook } from '../models/book.model';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class BooksService {
    public books: Book[] = [
        { id: 1, title: 'ngRx/store' },
        { id: 2, title: 'Exploring Angular' },
        { id: 3, title: 'Introduction to TypeScript' },
        { id: 4, title: 'Mastering RxJS' },
        { id: 5, title: 'ngRx/signals' },
        { id: 6, title: 'Learning Web Components' },
        { id: 7, title: 'Understanding Angular Directives' },
        { id: 8, title: 'Angular for Advanced Developers' },
        { id: 9, title: 'RxJS Mastery' },
        { id: 10, title: 'Advanced TypeScript Programming' },
    ];
    private url = 'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks';

    constructor(private http: HttpClient) { }

    async getBooks(): Promise<Book[]> {
        return this.books;
    }

    getBooksByQuery(query: string): Observable<Book[]> {
        const filtered = this.books.filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase())
        );

        return of(filtered);
    }

    getGoogleBooks(): Observable<Array<GoogleBook>> {
        return this.http.get<{ items: GoogleBook[] }>(this.url).pipe(map((books) => books.items || []))
    }
}
