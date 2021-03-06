import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {Book} from "../../model/book";
import {MatTableDataSource} from "@angular/material/table";
import {CourseService} from "../../service/course.service";
import {Course} from "../../model/course";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    ALL_SUBJECTS: string = 'All Subjects';

    selectedSearchType: string;
    selectedSubject: string;
    booksSearchResults: Book[] = [];
    subjects: String[] = [];

    bookDisplayedColumns = ['title', 'author', 'subject'];
    bookDataSource: MatTableDataSource<Book>;

    courseDisplayedColumns = ['title'];
    courseDataSource: MatTableDataSource<Course>;

    @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
    @ViewChildren(MatSort) sort = new QueryList<MatSort>();

    @ViewChild('bookPaginator') bookPaginator: MatPaginator;
    @ViewChild('bookSort') bookSort: MatSort;

    @ViewChild('coursePaginator') coursePaginator: MatPaginator;
    @ViewChild('courseSort') courseSort: MatSort;

    form = this.formBuilder.group({
        keyword: ''
    });

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private bookService: BookService,
                private courseService: CourseService) {
        this.selectedSearchType = 'Books';
        this.bookDataSource = new MatTableDataSource<Book>();
        this.courseDataSource = new MatTableDataSource<Course>();
    }

    ngOnInit(): void {
        this.getSubjects();
    }

    onSubmit(): void {
        let keyword = this.form.value.keyword;

        if (this.selectedSearchType == 'Books') {
            this.bookService.searchBooks(keyword).subscribe({
                next: (booksSearchResult: any) => {
                    this.courseDataSource.data = [];
                    this.booksSearchResults = booksSearchResult
                    this.bookDataSource.data = booksSearchResult;
                    this.bookDataSource.paginator = this.bookPaginator;
                    this.bookDataSource.sort = this.bookSort;
                },
                error: err => console.error(err)
            });
        } else {
            this.courseService.searchCourses(keyword).subscribe({
                next: (coursesSearchResult: any) => {
                    this.booksSearchResults = [];
                    this.bookDataSource.data = [];
                    this.courseDataSource.data = coursesSearchResult;
                    this.courseDataSource.paginator = this.coursePaginator;
                    this.courseDataSource.sort = this.courseSort;
                },
                error: err => console.error(err)
            });
        }
    }

    openBookDetails(bookId: string) {
        this.router.navigate(['book', bookId]);
    }

    openCourseDetails(courseId: string) {
        this.router.navigate(['course', courseId]);
    }

    applySubjectFilter() {
        if (this.selectedSubject == this.ALL_SUBJECTS) {
            this.bookDataSource.data = this.booksSearchResults;
        } else {
            this.bookDataSource.data = this.booksSearchResults.filter(book => book.subject == this.selectedSubject);
        }
    }

    private getSubjects() {
        return this.bookService.getSubjects().subscribe({
            next: (subjects: any) => {
                this.subjects = subjects;
                this.selectedSubject = this.ALL_SUBJECTS;
            },
            error: err => console.error(err)
        });
    }

}
