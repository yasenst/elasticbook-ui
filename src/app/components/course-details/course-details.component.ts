import { Component, OnInit } from '@angular/core';
import {Course} from "../../model/course";
import {CourseService} from "../../service/course.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../../model/book";

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
                private location: Location) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.getCourseDetails(params['courseId']);
        });
    }

    back(): void {
        this.location.back();
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
