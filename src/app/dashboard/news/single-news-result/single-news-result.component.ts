import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../shared/data.service';
import {NewsPost} from '../../../shared/models/news-post.model';

@Component({
    selector: 'app-single-news-result',
    templateUrl: './single-news-result.component.html',
    styleUrls: ['./single-news-result.component.scss']
})
export class SingleNewsResultComponent implements OnInit {
    @Input() newsPost: NewsPost;
    @Input() postIndex: number;
    title: string;
    content: string;

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.title = this.newsPost.title;
        this.content = this.newsPost.content;
    }

    save() {
        const editedPost = this.newsPost;
        editedPost.title = this.title;
        editedPost.content = this.content;
        this.dataService.submitNews(editedPost);
    }

    delete() {
        this.dataService.deleteNews(this.newsPost);
    }


}
