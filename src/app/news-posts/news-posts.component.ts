import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { NewsPost } from '../shared/models/news-post.model';
import { orderBy } from 'lodash';

@Component({
  selector: 'app-news-posts',
  templateUrl: './news-posts.component.html',
  styleUrls: ['./news-posts.component.scss']
})
export class NewsPostsComponent implements OnInit {
  dataLoaded = false;
  newsPosts: NewsPost[];
  displayedColumns: string[] = ['date', 'title', 'actions'];
  showInactiveAndDeletedPosts = false;

  newsActionActive = false;
  selectedNewsPost: NewsPost;

  private newsPostsCollection: AngularFirestoreCollection<NewsPost>;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.newsPostsCollection = this.afs.collection<NewsPost>('news-posts');
    this.newsPostsCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe(newsPosts => {
        this.newsPosts = newsPosts;
        this.dataLoaded = true;
      });
  }

  get newsPostsFiltered(): NewsPost[] {
    return orderBy(
      this.showInactiveAndDeletedPosts
        ? this.newsPosts
        : this.newsPosts
            .filter((newsPost: NewsPost) => {
              return newsPost.deleted !== true;
            })
            .slice(0, 4),
      ['date'],
      ['desc']
    );
  }

  edit(newsPost: NewsPost): void {
    this.selectedNewsPost = newsPost;
    this.newsActionActive = true;
  }

  delete(newsPost: NewsPost): void {
    newsPost.deleted = true;
    this.afs.doc<NewsPost>(`news-posts/${newsPost.id}`).update(newsPost);
  }

  restore(newsPost: NewsPost): void {
    newsPost.deleted = false;
    this.afs.doc<NewsPost>(`news-posts/${newsPost.id}`).update(newsPost);
  }

  toggleInactivePosts(): void {
    this.showInactiveAndDeletedPosts = !this.showInactiveAndDeletedPosts;
  }

  get postToggleText(): string {
    return this.showInactiveAndDeletedPosts ? 'Hide' : 'Show';
  }

  back(): void {
    this.newsActionActive = false;
    this.selectedNewsPost = null;
  }
}
