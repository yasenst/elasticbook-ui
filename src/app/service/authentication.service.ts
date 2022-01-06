import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs";
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
                    return userData;
                })
            );
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem("username");
        //console.log(!(user === null));
        return !(user === null);
    }

    getLoggedUsername() {
        return sessionStorage.getItem("username");
    }

    logOut() {
        sessionStorage.removeItem("username");
    }
}
