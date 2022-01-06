import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Book} from "../../../model/book";
import {BookService} from "../../../service/book.service";

@Component({
    selector: 'app-book-details-category',
    templateUrl: './book-details-category.component.html',
    styleUrls: ['./book-details-category.component.css']
})
export class BookDetailsCategoryComponent implements OnChanges {

    @Input()
    book: Book;

    data: any | undefined;
    booksFromSameCategory: Book[] = [];

    constructor(private bookService: BookService) { }

    private getBooks() {
        this.bookService.getBooksBySubject(this.book.subject).subscribe({
            next: (data) => {
                this.data = data as Array<Book>;
                if (this.data.content != undefined) {
                    this.booksFromSameCategory = this.data.content;
                }
            },
            error: err => console.error(err)
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.book != undefined) {
            this.getBooks();
        }
    }

}
