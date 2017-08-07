import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    isAuthenticated: boolean;

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        this.isAuthenticated = this.authService.isAuthenticated();
        if (!this.isAuthenticated) {
            this.router.navigate(['/log-in']);
        }
    }

}
