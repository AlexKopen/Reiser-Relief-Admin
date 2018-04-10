import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { NewsPost } from '../shared/models/news-post.model';
import { Subscription } from 'rxjs/Subscription';
import { Application } from '../shared/models/application.model';
import { TripDate } from '../shared/models/trip-date.model';

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

  private tripDates: Array<TripDate>;
  private tripDatesSubscription: Subscription;

  private dataCallInProgess = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loadNewsPosts();
    this.loadApplications();
    this.loadTripDates();
  }

  get dataLoading(): boolean {
    return this.dataCallInProgess;
  }

  get allNewsPosts(): Array<NewsPost> {
    return this.newsPosts ? this.newsPosts : [];
  }

  get allApplications(): Array<Application> {
    return this.applications ? this.applications : [];
  }

  get allTripDates(): Array<TripDate> {
    return this.tripDates ? this.tripDates : [];
  }

  private loadNewsPosts(): void {
    this.dataCallInProgess = true;
    this.newsPostsSubscription = this.dataService.getNewsPosts().subscribe(
      data => this.loadNewsPostsCallback(data)
    );
  }

  private loadNewsPostsCallback(newsPosts: Array<NewsPost>): void {
    this.newsPosts = newsPosts;
    this.dataCallInProgess = false;
  }

  private loadApplications(): void {
    this.applicationsSubscription = this.dataService.getApplications().subscribe(
      data => this.applications = data
    );
  }

  private loadTripDates(): void {
    this.tripDatesSubscription = this.dataService.getTripDates().subscribe(
      data => this.tripDates = data
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

  reloadApplications(): void {
    this.loadApplications();
  }

  reloadTripDates(): void {
    this.loadTripDates();
  }

  ngOnDestroy() {
    this.newsPostsSubscription.unsubscribe();
    this.applicationsSubscription.unsubscribe();
  }
}
