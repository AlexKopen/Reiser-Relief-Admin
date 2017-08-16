import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';

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

    constructor() {
    }

    ngOnInit() {
    }


    onSubmit(newsPostForm: FormGroup) {
        if (newsPostForm.valid) {
            console.log(this.title.viewModel);
            console.log(this.content.viewModel);

        } else {
            this.formSubmittedAndNotProcessed = true;
        }
    }


}
