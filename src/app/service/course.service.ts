import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }

    getCourseById(courseId: string) {
        return this.http.get('/server/courses/' + courseId);
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
