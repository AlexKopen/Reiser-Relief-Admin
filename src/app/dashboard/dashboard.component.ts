import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/index';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth/auth.service';
import { NewsPost } from '../shared/models/news-post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dragons: NewsPost[];
  authSubscription: Subscription;
  dragonsSubscription: Subscription;
  displayedColumns: string[] = ['id', 'name', 'source'];
  private pageToDisplay: string;

  constructor(private api: ApiService, private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.pageToDisplay = data.page;
    });

    this.authSubscription = this.auth.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this._getDragons();
      } else {
        this.dragons = null;
        this._destroyDragonsSubscription();
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe from observables
    this.authSubscription.unsubscribe();
    this._destroyDragonsSubscription();
  }

  private _getDragons() {
    // Subscribe to dragons API observable
    this.dragonsSubscription = this.api.getNews$().subscribe(
      data => {
        this.dragons = data;
      },
      err => console.warn(err)
    );
  }

  private _destroyDragonsSubscription() {
    // If a dragons subscription exists, unsubscribe
    if (this.dragonsSubscription) {
      this.dragonsSubscription.unsubscribe();
    }
  }

  get dragonsExist() {
    return !!this.dragons && this.dragons.length;
  }

  get activePage(): string {
    return this.pageToDisplay ? this.pageToDisplay : '';
  }
}
