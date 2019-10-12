import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  authLoaded = false;
  showLoginForm: boolean;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState
      .pipe(
        flatMap(() => {
          return this.afAuth.user;
        })
      )
      .subscribe((user: any) => {
        this.showLoginForm = user === null;
        this.authLoaded = true;
      });
  }
}
