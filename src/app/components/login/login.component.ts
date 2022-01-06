import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username = ''
    password = ''
    invalidLogin = false

    @Input() error: string | null;

    constructor(private router: Router,
                private loginService: AuthenticationService) { }

    ngOnInit(): void {
    }

    checkLogin() {
        (this.loginService.authenticate(this.username, this.password).subscribe(
                data => {
                    this.router.navigate([''])
                    this.invalidLogin = false
                },
                error => {
                    this.invalidLogin = true
                    this.error = error.message;

                }
            )
        );

    }
}
