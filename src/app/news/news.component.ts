import { Component, Input } from '@angular/core';
import { NewsPost } from '../shared/models/news-post.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  @Input() private newsPosts: Array<NewsPost>;
  previewTitle: string;
  previewHTML: string;

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
    this.dataService.submitNewsPost(newsPost).subscribe();

    this.previewTitle = '';
    this.previewHTML = '';
  }
}
