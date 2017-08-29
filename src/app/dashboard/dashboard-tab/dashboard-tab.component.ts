import {Component, OnInit} from '@angular/core';
import {DataService} from '../../shared/data.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-tab',
  templateUrl: './dashboard-tab.component.html',
  styleUrls: ['./dashboard-tab.component.scss']
})
export class DashboardTabComponent implements OnInit {
  selectedTab: string;
  selectedTabSubscription: Subscription;

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.selectedTab = this.dataService.selectedTab;
    this.selectedTabSubscription = this.dataService.selectedTabSubject.subscribe((value) => {
      this.selectedTab = value;
    });

  }

  setSelectedTab(selectedTab: string) {
    this.dataService.selectedTabSubject.next(selectedTab);
    this.dataService.selectedTab = selectedTab;
    this.selectedTab = this.dataService.selectedTab;
    this.router.navigate(['dashboard/' + this.selectedTab.toLowerCase()]);
  }

}
