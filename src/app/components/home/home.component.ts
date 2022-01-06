import { Component, OnInit } from '@angular/core';
import {BookService} from "../../service/book.service";
import {Book} from "../../model/book";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    data: any | undefined;
    sampleBooks: Book[] = [];

    constructor(private bookService: BookService) { }

    ngOnInit(): void {
        this.getSampleBooks();
    }

    private getSampleBooks() {
        this.bookService.getSampleBooks().subscribe({
            next: (data: any) => {
                data.searchHits.forEach(searchHit => this.sampleBooks.push(searchHit.content));
            },
            error: err => console.error(err)
        });
    }

}
