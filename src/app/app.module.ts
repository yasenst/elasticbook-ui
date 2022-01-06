import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import { BookDetailsComponent } from './components/book-details/book-details.component';
import {RouterModule} from "@angular/router";
import { BookDetailsCategoryComponent } from './components/book-details/book-details-category/book-details-category.component';
import { SearchComponent } from './components/search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatRippleModule} from "@angular/material/core";
import { HeaderComponent } from './components/header/header.component';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import { FooterComponent } from './components/footer/footer.component';
import {JwtHttpInterceptorService} from "./service/jwt-http-interceptor.service";
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import { UserBooksComponent } from './components/user-books/user-books.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { MaterialModule } from './material/material.module';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookDetailsComponent,
    BookDetailsCategoryComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    UserBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRippleModule,
    MatToolbarModule,
    FormsModule,
      MatSnackBarModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MaterialModule,
      MatSortModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
