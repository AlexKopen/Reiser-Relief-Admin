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
    selectedTab = 'News';

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['dashboard/news']);
        }
    }

    setSelectedTab(selectedTab: string) {
        this.selectedTab = selectedTab;
    }

}
