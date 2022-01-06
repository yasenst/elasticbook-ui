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
    return this.http.get('/server/api/books/' + bookId);
    }

    getSampleBooks() {
        return this.http.get('/server/api/books/sample');
    }

    getBooksBySubject(subject: string) {
      return this.http.get('/server/api/books/subject/' + subject);
    }

    getSimilarBooks(bookId: string) {
        return this.http.get('/server/api/books/' + bookId + '/similar');
    }

    searchBooks(text: string, subject: string) {
        let url = '/server/api/books/search?text=';
        if (subject != undefined) {
            return this.http.get(url + text + '&subject=' + subject);
        }
        return this.http.get(url + text);
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
