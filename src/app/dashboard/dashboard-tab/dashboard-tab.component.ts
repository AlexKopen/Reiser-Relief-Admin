import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-tab',
  templateUrl: './dashboard-tab.component.html',
  styleUrls: ['./dashboard-tab.component.scss']
})
export class DashboardTabComponent implements OnInit {
  @Input() selectedTab: string;

  constructor() { }

  ngOnInit() {
  }

}
