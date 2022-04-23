import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BookService} from "../../service/book.service";
import {BookDto} from "../../model/BookDto";
import {CourseDto} from "../../model/CourseDto";
import {CourseService} from "../../service/course.service";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

    form: FormGroup;
    subjects: String[] = [];
    selectedSubject: string;

    @Input() error: string | null;

    constructor(private bookService: BookService,
                private courseService: CourseService,
                private formBuilder: FormBuilder,
                private router: Router,
                private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            subject: ['', Validators.required]
        });

        this.getSubjects();
    }

    onSubmit() {
        let courseDto = new CourseDto();
        courseDto.title = this.form.controls['title'].value;
        courseDto.description = this.form.controls['description'].value;
        courseDto.subject = this.selectedSubject;

        return this.courseService.createCourse(courseDto).subscribe({
            next: (course: any) => {
                this.snackBar.open("Course created successfully.", 'Close', {
                    duration: 2000
                });
                this.router.navigate(['/course', course.id]);
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
