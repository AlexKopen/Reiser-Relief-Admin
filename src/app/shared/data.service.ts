import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ENDPOINT } from './endpoint.constants';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { NewsPost } from './models/news-post.model';
import { Application } from './models/application.model';
import { TripDate } from './models/trip-date.model';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  // News
  getNewsPosts(): Observable<Array<NewsPost>> {
    return this.http
      .get(ENDPOINT.newsUrlPublic)
      .pipe(
        catchError(this.handleError)
      );
  }

  submitNewsPost(newsPost: NewsPost) {
    return this.http
      .post<NewsPost>(ENDPOINT.newsUrlPrivate, newsPost, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateNewsPost(newsPost: NewsPost) {
    return this.http
      .put<NewsPost>(ENDPOINT.newsUrlPrivate + '/' + newsPost.id, newsPost, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteNewsPost(newsPost: NewsPost) {
    return this.http
      .delete<NewsPost>(ENDPOINT.newsUrlPrivate + '/' + newsPost.id, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  // Applications
  getApplications(): Observable<Array<Application>> {
    return this.http
      .get(ENDPOINT.applicationsUrlPrivate, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteApplication(application: Application) {
    return this.http
      .delete<Application>(ENDPOINT.applicationsUrlPrivate + '/' + application.id, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  // Trip Dates
  getTripDates(): Observable<Array<TripDate>> {
    return this.http
      .get(ENDPOINT.tripDatesUrlPublic)
      .pipe(
        catchError(this.handleError)
      );
  }

  submitTripDate(tripDate: TripDate) {
    return this.http
      .post<TripDate>(ENDPOINT.tripDatesUrlPrivate, tripDate, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateTripDate(tripDate: TripDate) {
    return this.http
      .put<TripDate>(ENDPOINT.tripDatesUrlPrivate + '/' + tripDate.id, tripDate, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTripDate(tripDate: TripDate) {
    return this.http
      .delete<TripDate>(ENDPOINT.tripDatesUrlPrivate + '/' + tripDate.id, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    window.location.href = window.location.href.split('/')[0] + '//' +
      window.location.href.split('/')[2];
    return Observable.throw(err.message || err);
  }

}
