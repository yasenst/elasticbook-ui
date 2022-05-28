import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../model/book";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../service/book.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BookDto} from "../../model/BookDto";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

    book: Book;
    form: FormGroup;
    subjects: String[] = [];
    selectedSubject: string;

    @Input() error: string | null;

    constructor(private activatedRoute: ActivatedRoute,
                private bookService: BookService,
                private formBuilder: FormBuilder,
                private router: Router,
                private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.getBookDetails(params['bookId']);
        });

    }

    onSubmit() {
        let updatedBook = new BookDto();
        updatedBook.title = this.form.controls['title'].value;
        updatedBook.description = this.form.controls['description'].value;
        updatedBook.author = this.form.controls['author'].value;
        updatedBook.subject = this.selectedSubject;

        return this.bookService.updateBook(this.book.id, updatedBook).subscribe({
            next: (book: any) => {
                this.snackBar.open("Book updated successfully.", 'Close', {
                    duration: 2000
                });
                this.router.navigate(['/book', book.id]);
            },
            error: err => {
                this.error = err.error;
            }
        });
    }

    private getBookDetails(bookId: string) {
        this.bookService.getBookById(bookId).subscribe({
            next: (book) => {
                this.book = book as Book;
                this.initForm(this.book);
                this.getSubjects();
            },
            error: err => console.error(err)
        });
    }

    private initForm(book: Book) {
        this.form = this.formBuilder.group({
            title: [book.title, Validators.required],
            author: [book.author, Validators.required],
            description: [book.description, Validators.required],
            subject: [book.subject, Validators.required]
        });
    }

    private getSubjects() {
        return this.bookService.getSubjects().subscribe({
            next: (subjects: any) => {
                this.subjects = subjects;
                this.selectedSubject = this.book.subject;
            },
            error: err => console.error(err)
        });
    }
}
