import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    invalidLogin = false

    @Input() error: string | null;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private loginService: AuthenticationService) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    checkLogin() {

        const { username, password } = this.form.value;

        (this.loginService.authenticate(username, password).subscribe(
                data => {
                    this.router.navigate([''])
                    this.invalidLogin = false
                },
                error => {
                    this.invalidLogin = true
                    this.error = "Incorrect username or password.";

                }
            )
        );

    }
}
