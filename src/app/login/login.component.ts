import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  showSpinner = false;
  showError = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.previousSessionCookiesSet) {
      this.router.navigate(['dashboard']);
    }
    this.auth.logInError$.subscribe(data => this.processLoginError(data));
  }

  login(): void {
    this.showError = false;
    this.showSpinner = true;
    this.auth.login(this.username, this.password);
  }

  processLoginError(errorCaught: boolean): void {
    if (errorCaught) {
      this.showSpinner = false;
      this.showError = true;
    }
  }
}
