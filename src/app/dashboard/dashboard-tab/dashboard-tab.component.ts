import {Component, OnInit} from '@angular/core';
import {DataService} from '../../shared/data.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard-tab',
  templateUrl: './dashboard-tab.component.html',
  styleUrls: ['./dashboard-tab.component.scss']
})
export class DashboardTabComponent implements OnInit {
  selectedTab: string;
  selectedTabSubscription: Subscription;
  showNavBar = false;
  showNavBarSubscription: Subscription;

  constructor(private dataService: DataService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.selectedTab = this.dataService.selectedTab;
    this.selectedTabSubscription = this.dataService.selectedTabSubject.subscribe((value) => {
      this.selectedTab = value;
    });

    this.showNavBar = this.dataService.showNavBar;
    this.showNavBarSubscription = this.dataService.showNavBarSubject.subscribe((value) => {
      this.showNavBar = value;
    });
  }

  setSelectedTab(selectedTab: string) {
    this.dataService.selectedTabSubject.next(selectedTab);
    this.dataService.selectedTab = selectedTab;
    this.selectedTab = this.dataService.selectedTab;
    this.router.navigate(['dashboard/' + this.selectedTab.toLowerCase()]);
  }

}
