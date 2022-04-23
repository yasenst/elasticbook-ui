import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LoginDto} from "../model/login-dto";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    constructor(private httpClient: HttpClient) {}

    authenticate(username, password) {
        let loginDto: LoginDto = new LoginDto();
        loginDto.username = username;
        loginDto.password = password;
        //let payload = JSON.stringify(loginDto);
        return this.httpClient
            .post<any>("http://localhost:8080/authenticate", { username, password }, httpOptions)
            .pipe(
                map(userData => {
                    sessionStorage.setItem("username", username);
                    let tokenStr = "Bearer " + userData.token;
                    sessionStorage.setItem("token", tokenStr);
                    sessionStorage.setItem("roles", userData.roles);
                    return userData;
                })
            );
    }

    register(username: string, password: string): Observable<any> {
        return this.httpClient.post("http://localhost:8080/register", {
            username,
            password
        }, {responseType: 'text'});
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem("username");
        //console.log(!(user === null));
        return !(user === null);
    }

    hasRoleUser() {
        if (!this.isUserLoggedIn()) {
            return false;
        }
        let roles = sessionStorage.getItem("roles");
        return roles.includes('USER');
    }

    hasRoleAdmin() {
        if (!this.isUserLoggedIn()) {
            return false;
        }
        let roles = sessionStorage.getItem("roles");
        return roles.includes('ADMIN');
    }

    public getUser(): any {
        const user = sessionStorage.getItem("user");
        if (user) {
            return JSON.parse(user);
        }

        return {};
    }

    getLoggedUsername() {
        return sessionStorage.getItem("username");
    }

    logOut() {
        sessionStorage.clear();
        //sessionStorage.removeItem("username");
    }
}
