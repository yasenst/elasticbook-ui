import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {Book} from "../../model/book";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    selectedSubject: string;
    searchResults: Book[] = [];

    form = this.formBuilder.group({
        keyword: ''
    });

    constructor(private formBuilder: FormBuilder,
                private bookService: BookService) { }

    ngOnInit(): void {

    }

    changeSubject(event: any) {
        this.selectedSubject = event.value;
    }

    onSubmit(): void {
        let keyword = this.form.value.keyword;

        this.bookService.searchBooks(keyword, this.selectedSubject).subscribe({
            next: (result: any) => {
                if (this.searchResults.length > 0) {
                    this.searchResults = [];
                }
                result.searchHits.forEach(searchHit => this.searchResults.push(searchHit.content));
            },
            error: err => console.error(err)
        });
    }

}
