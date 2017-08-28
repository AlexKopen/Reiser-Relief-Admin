import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ENDPOINT} from './endpoint.constants';
import {AuthHttp} from 'angular2-jwt';
import {NewsPost} from './models/news-post.model';
import {Headers, Http} from '@angular/http';
import {EventEntry} from './models/event-entry.model';
import {Application} from './models/application.model';
import {ApplicationDate} from './models/application-date.model';

@Injectable()
export class DataService {
    baseUrl = 'http://127.0.0.1:3001';
    loginUnsuccessful = false;
    loginUnsuccessfulSubject = new Subject<boolean>();
    allNews: Array<NewsPost> = [];
    allNewsSubject = new Subject<Array<NewsPost>>();
    allEvents: Array<EventEntry> = [];
    allEventsSubject = new Subject<Array<EventEntry>>();
    allApplicationDates: Array<ApplicationDate> = [];
    allApplicationDatesSubject = new Subject<Array<ApplicationDate>>();
    allApplications: Array<Application> = [];
    allApplicationsSubject = new Subject<Array<Application>>();

    constructor(private authHttp: AuthHttp, private http: Http) {
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

    getAllApplicationDates() {
        this.http.get(this.baseUrl + ENDPOINT.applicationDatesUrlPublic)
          .map(res => res.json())
          .subscribe(
            data => this.allApplicationDates = JSON.parse(data),
            error => console.log(error),
            () => this.allApplicationDatesSubject.next(this.allApplicationDates)
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