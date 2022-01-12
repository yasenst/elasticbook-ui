import {Component, OnInit, ViewChild} from '@angular/core';
import {Book} from "../../model/book";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AuthenticationService} from "../../service/authentication.service";
import {BookService} from "../../service/book.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-books',
    templateUrl: './user-books.component.html',
    styleUrls: ['./user-books.component.css']
})
export class UserBooksComponent implements OnInit {

    displayedColumns = ['title', 'author', 'subject'];
    dataSource: MatTableDataSource<Book>;
    personallyRecommendedBooks: Book[] = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private bookService: BookService,
                private router: Router,
                private authService: AuthenticationService) { }

    ngOnInit(): void {
        if (this.authService.isUserLoggedIn()) {
            this.bookService.getBooksForUser().subscribe({
                next: (books) => {
                    this.dataSource = new MatTableDataSource(books);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                },
                error: err => console.error(err),
                complete: () => {
                    let bookIdList: string[] = this.dataSource.data.map(book => book.id);
                    this.getRecommendedBasedOnList(bookIdList);
                }
            });
        }
    }

    getLoggedUsername() {
        return this.authService.getLoggedUsername();
    }

    openBookDetails(bookId: string) {
        this.router.navigate(['book', bookId]);
    }

    private getRecommendedBasedOnList(bookIdList: string[]) {
        this.bookService.getRecommendedBasedOnList(bookIdList).subscribe({
            next: (books:any) => {
                this.personallyRecommendedBooks = books;
            },
            error: err => console.error(err)
        });
    }
}
