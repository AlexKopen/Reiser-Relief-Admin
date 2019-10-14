import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

@Component({
  selector: 'app-news-posts',
  templateUrl: './news-posts.component.html',
  styleUrls: ['./news-posts.component.scss']
})
export class NewsPostsComponent implements OnInit {
  private newsPostsCollection: AngularFirestoreCollection<any>;
  newsPosts: any[];

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.newsPostsCollection = this.afs.collection<any>('news-posts');
    this.newsPostsCollection.valueChanges().subscribe(newsPosts => {
      this.newsPosts = newsPosts;
    });
  }
}
