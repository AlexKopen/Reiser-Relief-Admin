import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { NewsPost } from '../shared/models/news-post.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements OnInit {
  @Input() postToEdit: NewsPost;
  @Output() updateNews = new EventEmitter();
  @Output() close = new EventEmitter();

  previewTitle: string;
  previewHTML: string;
  currentDate: string;
  buttonText: string;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.previewTitle = this.postToEdit ? this.postToEdit.title : 'Post Title';
    this.previewHTML = this.postToEdit ? this.postToEdit.content : '<p>Post content</p>';
    this.currentDate = this.postToEdit ? this.postToEdit.date : String(new Date());
    this.buttonText = this.postToEdit ? 'Update News Entry' : 'Submit News Entry';
  }

  get submitDisabled(): boolean {
    return !this.previewTitle || !this.previewHTML;
  }

  newsSubmit(): void {
    if (this.postToEdit) {
      this.postToEdit.title = this.previewTitle;
      this.postToEdit.content = this.previewHTML;
      this.dataService.updateNewsPost(this.postToEdit).subscribe(data => this.sendUpdate());
    } else {
      const newsPost = new NewsPost(null, this.previewTitle, null, this.previewHTML);
      this.dataService.submitNewsPost(newsPost).subscribe(data => this.sendUpdate());
    }
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
