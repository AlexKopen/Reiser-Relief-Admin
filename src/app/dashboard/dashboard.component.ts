import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    isAuthenticated: boolean;
    message: string;

    constructor(private router: Router, private authService: AuthService, private authHttp: AuthHttp) {
    }

    ngOnInit() {
        this.isAuthenticated = this.authService.isAuthenticated();
        if (!this.isAuthenticated) {
            this.router.navigate(['/log-in']);
        }
    }

    apiCall() {
        this.authHttp.get('http://localhost:3001/secured/ping')
            .map(res => res.json())
            .subscribe(
                data => this.message = data.message,
                error => this.message = error
            );
    }

}
