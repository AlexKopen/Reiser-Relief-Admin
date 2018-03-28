import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsPost } from '../shared/models/news-post.model';
import { DataService } from '../shared/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  @Input() private newsPosts: Array<NewsPost>;
  @Output() updateNews = new EventEmitter();

  previewTitle = 'Post Title';
  previewHTML = '<p>Post content</p>';
  currentDate = new Date();

  constructor(private dataService: DataService) {
  }

  get allNewsPosts(): Array<NewsPost> {
    return this.newsPosts ? this.newsPosts : [];
  }

  get submitDisabled(): boolean {
    return !this.previewTitle || !this.previewHTML;
  }

  newsSubmit(): void {
    const newsPost = new NewsPost(null, this.previewTitle, null, this.previewHTML);
    this.dataService.submitNewsPost(newsPost).subscribe(data => this.updateNews.next());

    this.previewTitle = 'Post Title';
    this.previewHTML = '<p>Post content</p>';

    Swal(
      'News Entry Submitted',
      '',
      'success'
    );
  }
}
