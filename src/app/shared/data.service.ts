import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ENDPOINT} from './endpoint.constants';
import {AuthHttp} from 'angular2-jwt';
import {NewsPost} from './models/news-post.model';
import {Headers, Http} from '@angular/http';
import {EventEntry} from './models/event-entry.model';
import {Application} from './models/application.model';
import {TripDate} from './models/trip-date.model';
import {Router} from '@angular/router';

@Injectable()
export class DataService {
    baseUrl = 'http://127.0.0.1:3001';
    loginUnsuccessful = false;
    loginUnsuccessfulSubject = new Subject<boolean>();
    allNews: Array<NewsPost> = [];
    allNewsSubject = new Subject<Array<NewsPost>>();
    allEvents: Array<EventEntry> = [];
    allEventsSubject = new Subject<Array<EventEntry>>();
    allTripDates: Array<TripDate> = [];
    allTripDatesSubject = new Subject<Array<TripDate>>();
    allApplications: Array<Application> = [];
    allApplicationsSubject = new Subject<Array<Application>>();
    selectedTab: string;
    selectedTabSubject = new Subject<string>();

    constructor(private authHttp: AuthHttp, private http: Http, private router: Router) {
    }

    setTab() {
      let endRoute = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
      endRoute = endRoute.charAt(0).toUpperCase() + endRoute.slice(1);
      this.selectedTabSubject.next(endRoute);
      this.selectedTab = endRoute;
    }

    setLoginUnsuccessful(state: boolean) {
        this.loginUnsuccessful = state;
        this.loginUnsuccessfulSubject.next(this.loginUnsuccessful);
    }

    submitNews(newsPost: NewsPost) {
        const body = JSON.stringify(newsPost);

        this.authHttp.post(this.baseUrl + ENDPOINT.newsUrlPrivate, body)
            .subscribe(
                data => this.getAllNews(),
                err => console.log(err),
                () => console.log('Request Complete')
            );
    }

    getAllNews() {
        this.http.get(this.baseUrl + ENDPOINT.newsUrlPublic)
          .map(res => res.json())
          .subscribe(
            data => this.allNews = JSON.parse(data),
            error => console.log(error),
            () => this.allNewsSubject.next(this.allNews)
          );
    }

    deleteNews(newsPost: NewsPost) {
        const myHeader = new Headers();
        myHeader.append('Post-Id', newsPost.id.toString());

        this.authHttp.delete(this.baseUrl + ENDPOINT.newsUrlPrivate, { headers: myHeader })
            .subscribe(
                data => this.getAllNews(),
                err => console.log(err),
                () => console.log('Request Complete')
            );
    }

    getAllEvents() {
      this.http.get(this.baseUrl + ENDPOINT.eventsUrlPublic)
        .map(res => res.json())
        .subscribe(
          data => this.allEvents = JSON.parse(data),
          error => console.log(error),
          () => this.allEventsSubject.next(this.allEvents)
        );
    }

    submitAllEvents(events: Array<EventEntry>) {
        const body = JSON.stringify(events);

        this.authHttp.post(this.baseUrl + ENDPOINT.eventsUrlPrivate, body)
          .subscribe(
            data => this.getAllEvents(),
            err => console.log(err),
            () => console.log('Request Complete')
          );
    }

    getAllTripDates() {
        this.http.get(this.baseUrl + ENDPOINT.tripDatesUrlPublic)
          .map(res => res.json())
          .subscribe(
            data => this.allTripDates = JSON.parse(data),
            error => console.log(error),
            () => this.allTripDatesSubject.next(this.allTripDates)
          );
    }

    submitTripDate(tripDate: TripDate) {
      const body = JSON.stringify(tripDate);

      this.authHttp.post(this.baseUrl + ENDPOINT.tripDatesUrlPrivate, body)
        .subscribe(
          data => this.getAllTripDates(),
          err => console.log(err),
          () => console.log('Request Complete')
        );
    }

    deleteTrip(tripDate: TripDate) {
      const myHeader = new Headers();
      myHeader.append('Post-Id', tripDate.id.toString());

      this.authHttp.delete(this.baseUrl + ENDPOINT.tripDatesUrlPrivate, { headers: myHeader })
        .subscribe(
          data => this.getAllTripDates(),
          err => console.log(err),
          () => console.log('Request Complete')
        );
    }

    getAllApplications() {
        this.authHttp.get(this.baseUrl + ENDPOINT.applicationsUrlPrivate)
          .map(res => res.json())
          .subscribe(
            data => this.allApplications = JSON.parse(data),
            error => console.log(error),
            () => this.allApplicationsSubject.next(this.allApplications)
          );
    }
}
