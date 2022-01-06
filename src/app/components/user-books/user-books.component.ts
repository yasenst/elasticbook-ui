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
                error: err => console.error(err)
            });
        }
    }

    getLoggedUsername() {
        return this.authService.getLoggedUsername();
    }

    openBookDetails(bookId: string) {
        this.router.navigate(['book', bookId]);
    }
}
