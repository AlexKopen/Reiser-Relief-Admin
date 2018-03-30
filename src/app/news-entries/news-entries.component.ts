import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { NewsPost } from '../shared/models/news-post.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-news-entries',
  templateUrl: './news-entries.component.html',
  styleUrls: ['./news-entries.component.scss']
})
export class NewsEntriesComponent implements OnInit {
  @Input() newsPosts: Array<NewsPost>;
  @Output() editPost = new EventEmitter();
  @Output() deletePost = new EventEmitter();

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  editNewsPost(newsPost: NewsPost): void {
    this.editPost.next(newsPost);
  }

  deleteNewsPost(newsPost: NewsPost): void {
    this.dataService.deleteNewsPost(newsPost).subscribe(data => this.deleteNewsCallback());
  }

  private deleteNewsCallback(): void {
    this.deletePost.next();

    Swal(
      'News Entry Deleted',
      '',
      'success'
    );
  }
}
