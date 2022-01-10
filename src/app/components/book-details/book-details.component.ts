import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Book} from "../../model/book";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../service/book.service";
import {AuthenticationService} from "../../service/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Location } from '@angular/common'

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
    bookId: string;
    book: Book;
    booksFromSameSubject: Book[] = [];
    booksLikeThis: Book[] = [];

    userOwnsThisBook: boolean = false;

    constructor(private route: ActivatedRoute,
                private bookService: BookService,
                private snackBar: MatSnackBar,
                private location: Location,
                private authService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.getBookDetails(params['bookId']);
        });
    }

    addBookToUser() {
        this.bookService.addBookToUser(this.book.id).subscribe(
            data => {
                this.snackBar.open("Book added to 'My Books'", 'Close', {
                    duration: 1000
                });
                this.userOwnsThisBook = true;
            },
            (error) => {
                console.log(error.error.message);
            }
        );
    }

    isUserLoggedIn() {
        return this.authService.isUserLoggedIn();
    }

    back(): void {
        this.location.back();
    }

    private getBookDetails(bookId: string) {
        this.bookService.getBookById(bookId).subscribe({
            next: (book) => {
                this.book = book as Book;
            },
            error: err => console.error(err),
            complete: () => {
                this.getBooksLikeThis();
                this.getBooksFromSameSubject();
                this.checkIfUserOwnsThisBook();
            }
        });
    }

    private getBooksFromSameSubject() {
        this.bookService.getBooksBySubject(this.book.subject).subscribe({
            next: (data) => {
                let books:any = data;
                if (books.content != undefined) {
                    this.booksFromSameSubject = books.content;
                }
            },
            error: err => console.error(err)
        });
    }

    private getBooksLikeThis() {
        this.bookService.getSimilarBooks(this.book.id).subscribe({
            next: (booksLikeThis:any) => {
                this.booksLikeThis = booksLikeThis;
            },
            error: err => console.error(err)
        });
    }

    private checkIfUserOwnsThisBook() {
        if (!this.isUserLoggedIn()) {
            this.userOwnsThisBook = false;
        } else {
            this.bookService.userOwnsBook(this.book.id).subscribe({
                next: (result:boolean) => {
                    this.userOwnsThisBook = result;
                },
                error: err => console.error(err)
            });
        }
    }
}
