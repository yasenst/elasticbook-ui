import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(private http: HttpClient) { }

    getBookById(bookId: string) {
    return this.http.get('/es-server/books/' + bookId);
    }

    getSampleBooks() {
        return this.http.get('/es-server/books/sample');
    }

    getBooksBySubject(subject: string) {
      return this.http.get('/es-server/books/subject/' + subject);
    }

    getSimilarBooks(bookId: string) {
        return this.http.get('/es-server/books/' + bookId + '/morelikethis');
    }

    searchBooks(text: string): Observable<any> {
        let url = '/es-server/books/search?text=' + text;
        return this.http.get(url);
    }

    // SQL

    getBooksForUser():Observable<any> {
        return this.http.get('/server/users/books');
    }

    addBookToUser(bookId: string):Observable<any> {
        return this.http.post('/server/users/books/add', bookId, httpOptions);
    }

    userOwnsBook(bookId: string):Observable<any> {
        return this.http.post('/server/users/books/check-ownership', bookId, httpOptions);
    }
}
