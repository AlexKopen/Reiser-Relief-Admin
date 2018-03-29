import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsPost } from '../shared/models/news-post.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  @Input() private newsPosts: Array<NewsPost>;
  @Output() private reloadNews = new EventEmitter();

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

  cancel(): void {
    this.showNewsEdit = false;
  }

  editNewsPost(newsPost: NewsPost): void {
    console.log(newsPost.content);
  }

  deleteNewsPost(newsPost: NewsPost): void {
    console.log('deleting ', newsPost.id);
  }
}
