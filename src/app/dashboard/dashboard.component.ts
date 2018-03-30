import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { NewsPost } from '../shared/models/news-post.model';
import { Subscription } from 'rxjs/Subscription';
import { Application } from '../shared/models/application.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayTiles = true;
  showNews = false;
  showApplications = false;

  private newsPosts: Array<NewsPost>;
  private newsPostsSubscription: Subscription;

  private applications: Array<Application>;
  private applicationsSubscription: Subscription;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loadNewsPosts();
    this.loadApplications();
  }

  get allNewsPosts(): Array<NewsPost> {
    return this.newsPosts ? this.newsPosts : [];
  }

  get allApplications(): Array<Application> {
    return this.applications ? this.applications : [];
  }

  private loadNewsPosts(): void {
    this.newsPostsSubscription = this.dataService.getNewsPosts().subscribe(
      data => this.newsPosts = data
    );
  }

  private loadApplications(): void {
    this.applicationsSubscription = this.dataService.getApplications().subscribe(
      data => this.applications = data
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

  reloadNews(): void {
    this.loadNewsPosts();
  }

  ngOnDestroy() {
    this.newsPostsSubscription.unsubscribe();
  }
}
