import { Component, OnInit } from '@angular/core';
import {BookService} from "../../service/book.service";
import {Book} from "../../model/book";
import { browserRefresh } from 'src/app/app.component';
import {Course} from "../../model/course";
import {CourseService} from "../../service/course.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    sampleBooks: Book[] = [];
    sampleCourses: Course[] = [];

    //private browserRefresh;

    constructor(private bookService: BookService,
                private courseService: CourseService) { }

    ngOnInit(): void {
        // if you want to check if browser has been refreshed
        /*this.browserRefresh = browserRefresh;
        console.log('refreshed?:', browserRefresh);*/
        this.getSampleBooks();
        this.getSampleCourses();
    }

    private getSampleBooks() {
        this.bookService.getSampleBooks().subscribe({
            next: (sampleBooks: any) => {
                this.sampleBooks = sampleBooks;
            },
            error: err => console.error(err)
        });
    }

    private getSampleCourses() {
        this.courseService.getSampleCourses().subscribe({
            next: (sampleCourses: any) => {
                this.sampleCourses = sampleCourses;
            },
            error: err => console.error(err)
        });
    }
}
