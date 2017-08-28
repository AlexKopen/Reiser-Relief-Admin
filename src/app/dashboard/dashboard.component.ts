import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['dashboard/news']);
        }
    }

    // console.log('heyo' + this.router.url);
    // let endRoute = this.router.url.substr(this.router.url.lastIndexOf('/'));
    // endRoute = endRoute.charAt(0).toUpperCase() + endRoute.slice(1);
    // this.selectedTab = endRoute;
    // console.log(this.selectedTab);

}
