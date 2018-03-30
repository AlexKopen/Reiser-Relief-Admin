import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ENDPOINT } from './endpoint.constants';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { NewsPost } from './models/news-post.model';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

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

  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return Observable.throw(err.message || err);
  }

}
