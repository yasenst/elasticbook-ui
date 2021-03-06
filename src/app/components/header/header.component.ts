import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private loginService:AuthenticationService){ }

    ngOnInit(): void {
    }

    hasRoleUser() {
        return this.loginService.hasRoleUser();
    }

    hasRoleAdmin() {
        return this.loginService.hasRoleAdmin();
    }

    isUserLoggedIn() {
        return this.loginService.isUserLoggedIn();
    }

    getLoggedUsername() {
        return this.loginService.getLoggedUsername();
    }
}
