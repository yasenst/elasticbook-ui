import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    form: FormGroup;
    loading = false;
    submitted = false;

    @Input() error: string | null;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private snackBar: MatSnackBar,
                private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        const { username, password } = this.form.value;

        this.authService.register(username, password).subscribe(
            response => {
                console.log(response);
                this.snackBar.open("User registered successfully.", 'Close', {
                    duration: 2000
                });
                this.router.navigate(['login']);
            },
            err => {
                this.error = err.error;
                this.loading = false;
            }
        );
    }
}
