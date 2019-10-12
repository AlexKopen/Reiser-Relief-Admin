import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {}

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(
      'alexkopen@gmail.com',
      'password'
    );
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
