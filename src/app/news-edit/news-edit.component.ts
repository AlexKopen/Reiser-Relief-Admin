import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { NewsPost } from '../shared/models/news-post.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements OnInit {
  @Output() updateNews = new EventEmitter();
  @Output() close = new EventEmitter();

  previewTitle = 'Post Title';
  previewHTML = '<p>Post content</p>';
  currentDate = new Date();

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  get submitDisabled(): boolean {
    return !this.previewTitle || !this.previewHTML;
  }

  newsSubmit(): void {
    const newsPost = new NewsPost(null, this.previewTitle, null, this.previewHTML);
    this.dataService.submitNewsPost(newsPost).subscribe(data => this.sendUpdate());
  }

  private sendUpdate(): void {
    this.updateNews.next();

    Swal(
      'News Entry Submitted',
      '',
      'success'
    );

    this.closeClick();
  }

  closeClick(): void {
    this.close.next();
  }
}
