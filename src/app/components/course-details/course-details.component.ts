import { Component, OnInit } from '@angular/core';
import {Course} from "../../model/course";
import {CourseService} from "../../service/course.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../model/book";
import {AuthenticationService} from "../../service/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

    courseId: string;
    course: Course;
    recommendedBooks: Book[] = [];

    constructor(private route: ActivatedRoute,
                private courseService: CourseService,
                private location: Location,
                private router: Router,
                private snackBar: MatSnackBar,
                private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.getCourseDetails(params['courseId']);
        });
    }

    back(): void {
        this.location.back();
    }

    hasRoleAdmin() {
        return this.authService.hasRoleAdmin();
    }

    deleteCourse() {
        this.courseService.deleteCourse(this.course.id).subscribe(
            data => {
                this.snackBar.open("Course deleted.", 'Close', {
                    duration: 1000
                });
                this.router.navigate([''])
            },
            (error) => {
                this.snackBar.open("Couldn't delete course.", 'Close', {
                    duration: 1000
                });
                console.log(error.message);
                this.router.navigate(['']);
            }
        );
    }

    private getCourseDetails(courseId: string) {
        this.courseService.getCourseById(courseId).subscribe({
            next: (course) => {
                this.course = course as Course;
            },
            error: err => console.error(err),
            complete: () => {
                this.getRecommendedBooks();
            }
        });
    }

    private getRecommendedBooks() {
        this.courseService.getRecommendedBooks(this.course.id).subscribe({
            next: (recommendedBooks:any) => {
                this.recommendedBooks = recommendedBooks;
            },
            error: err => console.error(err)
        });
    }
}
