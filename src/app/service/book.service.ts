import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookDto} from "../model/BookDto";

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

    createBook(bookDto: BookDto) {
        return this.http.post('/server/books', bookDto, httpOptions);
    }

    updateBook(bookId: string, bookDto: BookDto) {
        return this.http.put('/server/books/' + bookId, bookDto, httpOptions);
    }

    deleteBook(bookId: string) {
        return this.http.delete('/server/books/' + bookId);
    }

    getSampleBooks() {
        return this.http.get('/server/books/sample');
    }

    getBooksBySubject(subject: string) {
      return this.http.get('/server/books/subjects/' + subject);
    }

    getSubjects() {
        return this.http.get('/server/books/subjects/');
    }

    getSimilarBooks(bookId: string) {
        return this.http.get('/server/books/' + bookId + '/similar');
    }

    getBooksOwnersAlsoLike(bookId: string):Observable<any> {
        return this.http.get('/server/books/' + bookId + '/aggregated');
    }

    getRecommendedBasedOnList(bookIdList: string[]) {
        return this.http.post('/server/books/recommended', bookIdList, httpOptions);
    }

    searchBooks(text: string): Observable<any> {
        text = encodeURIComponent(text);
        let url = '/server/books/search?text=' + text;
        return this.http.get(url);
    }

    getBooksForUser(userId: number):Observable<any> {
        return this.http.get('/server/users/' + userId + '/books');
    }

    addBookToUser(userId: number, bookId: string):Observable<any> {
        return this.http.post('/server/users/' + userId + '/books/' + bookId, httpOptions);
    }

    removeBookFromUser(userId: number, bookId: string):Observable<any> {
        return this.http.delete('/server/users/' + userId + '/books/' + bookId);
    }

    userOwnsBook(userId: number, bookId: string):Observable<any> {
        return this.http.get('/server/users/' + userId + '/books/' + bookId + '/ownership');
    }

}
