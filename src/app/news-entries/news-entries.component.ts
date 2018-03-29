import { Component, Input, OnInit } from '@angular/core';
import { NewsPost } from '../shared/models/news-post.model';

@Component({
  selector: 'app-news-entries',
  templateUrl: './news-entries.component.html',
  styleUrls: ['./news-entries.component.scss']
})
export class NewsEntriesComponent implements OnInit {
  @Input() newsPosts: Array<NewsPost>;

  constructor() {
  }

  ngOnInit() {
  }

  get allNewsPosts(): Array<NewsPost> {
    return this.newsPosts ? this.newsPosts : [];
  }

  editNewsPost(newsPost: NewsPost): void {
    console.log(newsPost.content);
  }

  deleteNewsPost(newsPost: NewsPost): void {
    console.log('deleting ', newsPost.id);
  }
}
