import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { NewsPost } from '../shared/models/news-post.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayTiles = true;
  showNews = false;
  showApplications = false;

  newsPosts: Array<NewsPost>;
  private newsPostsSubscription: Subscription;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.newsPostsSubscription = this.dataService.getNewsPosts().subscribe(
      data => this.newsPosts = data
    );
  }

  newsClick(): void {
    this.displayTiles = false;
    this.showNews = true;
  }

  applicationsClick(): void {
    this.displayTiles = false;
    this.showApplications = true;
  }

  get showCrumbs(): boolean {
    return this.showNews || this.showApplications;
  }

  homeClick(): void {
    this.showNews = false;
    this.showApplications = false;
    this.displayTiles = true;
  }

  ngOnDestroy() {
    this.newsPostsSubscription.unsubscribe();
  }
}
