import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DataService} from '../../shared/data.service';
import {NewsPost} from '../../shared/models/news-post.model';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
    formSubmittedAndNotProcessed = false;
    currentDate = new Date();
    @ViewChild('title') title;
    @ViewChild('content') content;

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
    }

    onSubmit(newsPostForm: FormGroup) {
        if (newsPostForm.valid) {
            const newsPost = new NewsPost();
            newsPost.title = this.title.viewModel;
            newsPost.content = this.content.viewModel;

            this.dataService.submitNews(newsPost);

            newsPostForm.reset();
        } else {
            this.formSubmittedAndNotProcessed = true;
        }
    }

}
