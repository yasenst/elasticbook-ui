import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Book} from "../../model/book";
import {ActivatedRoute, Router} from "@angular/router";
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
    booksOwnersAlsoLike: Book[] = [];

    userOwnsThisBook: boolean = false;

    constructor(private route: ActivatedRoute,
                private bookService: BookService,
                private snackBar: MatSnackBar,
                private location: Location,
                private router: Router,
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

    removeBookFromUser() {
        this.bookService.removeBookFromUser(this.book.id).subscribe(
            data => {
                this.snackBar.open("Book removed from 'My Books'", 'Close', {
                    duration: 1000
                });
                this.userOwnsThisBook = false;
            },
            (error) => {
                console.log(error.message);
            }
        );
    }

    deleteBook() {
        this.bookService.deleteBook(this.book.id).subscribe(
            data => {
                this.snackBar.open("Book deleted.", 'Close', {
                    duration: 1000
                });
                this.router.navigate([''])
            },
            (error) => {
                this.snackBar.open("Couldn't delete book.", 'Close', {
                    duration: 1000
                });
                console.log(error.message);
                this.router.navigate(['']);
            }
        );
    }

    hasRoleAdmin() {
        return this.authService.hasRoleAdmin();
    }

    hasRoleUser() {
        return this.authService.hasRoleUser();
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
                this.checkIfUserOwnsThisBook();
                this.getBooksLikeThis();
                this.getBooksOwnersAlsoLike();
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

    private getBooksOwnersAlsoLike() {
        this.bookService.getBooksOwnersAlsoLike(this.book.id).subscribe({
            next: (booksOwnersAlsoLike:any) => {
                this.booksOwnersAlsoLike = booksOwnersAlsoLike;
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
