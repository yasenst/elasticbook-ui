import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CourseDto} from "../model/CourseDto";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }

    getCourseById(courseId: string) {
        return this.http.get('/server/courses/' + courseId);
    }

    createCourse(courseDto: CourseDto) {
        return this.http.post('/server/courses', courseDto, httpOptions);
    }

    deleteCourse(courseId: string) {
        return this.http.delete('/server/courses/' + courseId);
    }

    getSampleCourses() {
        return this.http.get('/server/courses/sample');
    }

    getRecommendedBooks(courseId: string) {
        return this.http.get('/server/courses/' + courseId + '/recommended');
    }

    searchCourses(text: string): Observable<any> {
        let url = '/server/courses/search?text=' + text;
        return this.http.get(url);
    }
}
