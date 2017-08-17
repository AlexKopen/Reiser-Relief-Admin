import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ENDPOINT} from './endpoint.constants';
import {AuthHttp} from 'angular2-jwt';
import {NewsPost} from './models/news-post.model';

@Injectable()
export class DataService {
    baseUrl = 'http://localhost:3001';
    loginUnsuccessful = false;
    loginUnsuccessfulSubject = new Subject<boolean>();
    allNews: Array<NewsPost> = [];
    allNewsSubject = new Subject<Array<NewsPost>>();

    constructor(private authHttp: AuthHttp) {
    }

    setLoginUnsuccessful(state: boolean) {
        this.loginUnsuccessful = state;
        this.loginUnsuccessfulSubject.next(this.loginUnsuccessful);
    }

    submitNews(newsPost: NewsPost) {
        const body = JSON.stringify(newsPost);

        this.authHttp.post(this.baseUrl + ENDPOINT.newsUrl, body)
            .subscribe(
                data => console.log(data),
                err => console.log(err),
                () => console.log('Request Complete')
            );
    }

    getAllNews() {
        this.authHttp.get(this.baseUrl + ENDPOINT.newsUrl)
          .map(res => res.json())
          .subscribe(
            data => this.allNews = data,
            error => console.log(error),
            () => this.allNewsSubject.next(this.allNews)
          );
    }
}
