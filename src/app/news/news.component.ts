import { Component, Input } from '@angular/core';
import { NewsPost } from '../shared/models/news-post.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  @Input() private newsPosts: Array<NewsPost>;

  constructor() {
  }

  get allNewsPosts(): Array<NewsPost> {
    return this.newsPosts ? this.newsPosts : [];
  }
}
