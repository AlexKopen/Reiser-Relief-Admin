import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsPost } from '../shared/models/news-post.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  @Input() newsPosts: Array<NewsPost>;
  @Input() dataLoading: boolean;
  @Output() reloadNews = new EventEmitter();

  showNewsEdit = false;
  selectedNewsPost: NewsPost;
  showCreateButton = true;

  constructor() {
  }

  get loading(): boolean {
    return this.newsPosts.length === 0 || this.dataLoading;
  }

  updateNews(): void {
    this.reloadNews.next();
    this.selectedNewsPost = null;
  }

  createNewClick(): void {
    this.showNewsEdit = true;
  }

  close(): void {
    this.showNewsEdit = false;
    this.selectedNewsPost = null;
  }

  editPost(newsPost: NewsPost): void {
    this.selectedNewsPost = newsPost;
    this.showNewsEdit = true;
  }

  deletePost(): void {
    this.updateNews();
  }

  deletionInProgress(inProgress: boolean): void {
    this.showCreateButton = !inProgress;
  }
}
