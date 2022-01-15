import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(private http: HttpClient) { }

    getBookById(bookId: string) {
    return this.http.get('/server/books/' + bookId);
    }

    getSampleBooks() {
        return this.http.get('/server/books/sample');
    }

    getBooksBySubject(subject: string) {
      return this.http.get('/server/books/subjects/' + subject);
    }

    getSimilarBooks(bookId: string) {
        return this.http.get('/server/books/' + bookId + '/morelikethis');
    }

    getRecommendedBasedOnList(bookIdList: string[]) {
        return this.http.post('/server/books/recommended', bookIdList, httpOptions);
    }

    searchBooks(text: string): Observable<any> {
        let url = '/server/books/search?text=' + text;
        return this.http.get(url);
    }

    getBooksForUser():Observable<any> {
        return this.http.get('/server/users/books');
    }

    addBookToUser(bookId: string):Observable<any> {
        return this.http.post('/server/users/books/add', bookId, httpOptions);
    }

    removeBookFromUser(bookId: string):Observable<any> {
        return this.http.post('/server/users/books/remove', bookId, httpOptions);
    }

    userOwnsBook(bookId: string):Observable<any> {
        return this.http.post('/server/users/books/check-ownership', bookId, httpOptions);
    }

    // Mixed Aggregation

    getBooksOwnersAlsoLike(bookId: string):Observable<any> {
        return this.http.post('/server/users/books/recommended', bookId, httpOptions);
    }
}
