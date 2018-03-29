import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsPost } from '../shared/models/news-post.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  @Input() newsPosts: Array<NewsPost>;
  @Output() reloadNews = new EventEmitter();

  showNewsEdit = false;

  constructor() {
  }

  get allNewsPosts(): Array<NewsPost> {
    return this.newsPosts ? this.newsPosts : [];
  }

  updateNews(): void {
    this.reloadNews.next();
  }

  createNewClick(): void {
    this.showNewsEdit = true;
  }

  close(): void {
    this.showNewsEdit = false;
  }
}
