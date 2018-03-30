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
    Swal({
      title: 'Are you sure you want to delete "' + newsPost.title  + '"?',
      text: 'This news entry will no longer appear on the website.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.dataService.deleteNewsPost(newsPost).subscribe(data => this.deleteNewsCallback());
      }
    });
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
