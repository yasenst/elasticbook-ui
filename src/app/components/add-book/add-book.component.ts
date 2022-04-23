import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {BookService} from "../../service/book.service";
import {BookDto} from "../../model/BookDto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

    form: FormGroup;
    subjects: String[] = [];
    selectedSubject: string;

    @Input() error: string | null;

    constructor(private bookService: BookService,
                private formBuilder: FormBuilder,
                private router: Router,
                private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            author: ['', Validators.required],
            description: ['', Validators.required],
            subject: ['', Validators.required]
        });

        this.getSubjects();
    }

    onSubmit() {
        let newBook = new BookDto();
        newBook.title = this.form.controls['title'].value;
        newBook.description = this.form.controls['description'].value;
        newBook.author = this.form.controls['author'].value;
        newBook.subject = this.selectedSubject;

        return this.bookService.createBook(newBook).subscribe({
            next: (book: any) => {
                this.snackBar.open("Book created successfully.", 'Close', {
                    duration: 2000
                });
                this.router.navigate(['/book', book.id]);
            },
            error: err => {
                this.error = err.error;
            }
        });
    }

    private getSubjects() {
        return this.bookService.getSubjects().subscribe({
            next: (subjects: any) => {
                this.subjects = subjects;
                this.selectedSubject = 'Algorithms';
            },
            error: err => console.error(err)
        });
    }
}
