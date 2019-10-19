import { Component, Input, OnInit } from '@angular/core';
import { NewsPost } from '../shared/models/news-post.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-news-edit-and-create',
  templateUrl: './news-edit-and-create.component.html',
  styleUrls: ['./news-edit-and-create.component.scss']
})
export class NewsEditAndCreateComponent implements OnInit {
  @Input() newsPost: NewsPost;

  newsFormFields = {
    title: 'title',
    content: 'content'
  };

  newsForm: FormGroup;

  constructor() {}

  ngOnInit() {
    const formControls = {};

    Object.keys(this.newsFormFields).forEach(key => {
      formControls[key] = new FormControl(this.newsFormFields[key], [
        Validators.required
      ]);
    });

    this.newsForm = new FormGroup(formControls);

    if (this.newsPost) {
      this.newsForm
        .get(this.newsFormFields.title)
        .setValue(this.newsPost.title);
      this.newsForm
        .get(this.newsFormFields.content)
        .setValue(this.newsPost.content);
    }
  }
}
