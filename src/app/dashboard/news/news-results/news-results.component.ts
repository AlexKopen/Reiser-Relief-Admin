import {Component, Input, OnInit} from '@angular/core';
import {NewsPost} from '../../../shared/models/news-post.model';

@Component({
  selector: 'app-news-results',
  templateUrl: './news-results.component.html',
  styleUrls: ['./news-results.component.scss']
})
export class NewsResultsComponent implements OnInit {
  @Input() newsPosts: Array<NewsPost>;

  constructor() { }

  ngOnInit() {
  }
}
