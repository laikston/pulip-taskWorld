import { Component, OnInit } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { LoginService } from './service/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public constructor(
        private loginService: LoginService
    ) { }
    public ngOnInit() {
        this.loginService.setMemberId('schemak');
        this.loginService.setMemberIdx(9522);
    }
}