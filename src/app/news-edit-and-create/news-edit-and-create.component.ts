import { Component, Input, OnInit } from '@angular/core';
import { NewsPost } from '../shared/models/news-post.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

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

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    const formControls = {};

    Object.keys(this.newsFormFields).forEach(key => {
      formControls[key] = new FormControl(this.newsFormFields[key], [
        Validators.required
      ]);
    });

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

  updateClick(): void {
    this.afs
      .doc<NewsPost>(`news-posts/${this.newsPost.id}`)
      .update(this.newsForm.value);
  }

  get previewContent(): string {
    return this.newsForm.get(this.newsFormFields.content).value;
  }
}
