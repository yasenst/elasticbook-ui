import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {BookDetailsComponent} from "./components/book-details/book-details.component";
import {SearchComponent} from "./components/search/search.component";
import {LoginComponent} from "./components/login/login.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {AuthGuardService} from "./service/auth-guard.service";
import {UserBooksComponent} from "./components/user-books/user-books.component";
import {CourseDetailsComponent} from "./components/course-details/course-details.component";
import {RegisterComponent} from "./components/register/register.component";
import {AddBookComponent} from "./components/add-book/add-book.component";
import {AuthGuardAdminService} from "./service/auth-guard-admin.service";
import {AddCourseComponent} from "./components/add-course/add-course.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'book/:bookId',
        component: BookDetailsComponent
    },
    {
        path: 'course/:courseId',
        component: CourseDetailsComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LogoutComponent,
        canActivate:[AuthGuardService]
    },
    {
        path: 'user-books',
        component: UserBooksComponent,
        canActivate:[AuthGuardService]
    },
    {
        path: 'admin/add-book',
        component: AddBookComponent,
        canActivate:[AuthGuardAdminService]
    },
    {
        path: 'admin/add-course',
        component: AddCourseComponent,
        canActivate:[AuthGuardAdminService]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
