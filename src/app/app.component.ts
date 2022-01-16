import { Component } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'book-ui1';

    constructor(private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                browserRefresh = !router.navigated;
            }
        });
    }
}

