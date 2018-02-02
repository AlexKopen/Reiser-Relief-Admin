import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ENDPOINT} from './endpoint.constants';
import {AuthHttp} from 'angular2-jwt';
import {NewsPost} from './models/news-post.model';
import {Http} from '@angular/http';
import {EventEntry} from './models/event-entry.model';
import {Application} from './models/application.model';
import {TripDate} from './models/trip-date.model';
import {Router} from '@angular/router';

@Injectable()
export class DataService {
    baseUrl = 'http://api.reiserrelief.org/public';
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
    showNavBar = false;
    showNavBarSubject = new Subject<boolean>();

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

    setShowNavBar(state: boolean) {
      this.showNavBar = state;
      this.showNavBarSubject.next(this.showNavBar);
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

    updateNews(newsPost: NewsPost) {
        const body = JSON.stringify(newsPost);

        this.authHttp.put(this.baseUrl + ENDPOINT.newsUrlPrivate + '/' + newsPost.id, body)
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
            data => this.allNews = data,
            error => console.log(error),
            () => this.allNewsSubject.next(this.allNews)
          );
    }

    deleteNews(newsPost: NewsPost) {
        this.authHttp.delete(this.baseUrl + ENDPOINT.newsUrlPrivate + '/' + newsPost.id)
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
          data => this.allEvents = data,
          error => console.log(error),
          () => this.allEventsSubject.next(this.allEvents)
        );
    }

    updateEvent(event: EventEntry) {
        const body = JSON.stringify(event);

        this.authHttp.put(this.baseUrl + ENDPOINT.eventsUrlPrivate + '/' + event.symbol, body)
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
            data => this.allTripDates = data,
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

    updateTripDate(tripDate: TripDate) {
        const body = JSON.stringify(tripDate);

        this.authHttp.put(this.baseUrl + ENDPOINT.tripDatesUrlPrivate + '/' + tripDate.id, body)
            .subscribe(
                data => this.getAllTripDates(),
                err => console.log(err),
                () => console.log('Request Complete')
            );
    }

    deleteTrip(tripDate: TripDate) {
      this.authHttp.delete(this.baseUrl + ENDPOINT.tripDatesUrlPrivate + '/' + tripDate.id)
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
            data => this.allApplications = data,
            error => console.log(error),
            () => this.allApplicationsSubject.next(this.allApplications)
          );
    }
}
