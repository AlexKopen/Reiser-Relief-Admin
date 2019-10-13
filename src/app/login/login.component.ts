import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formSubmitted = false;
  loginInProcess = false;
  showLoginError = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {}

  login() {
    this.formSubmitted = true;
    this.showLoginError = false;

    if (!this.showFormErrors) {
      this.loginInProcess = true;
      this.afAuth.auth
        .signInWithEmailAndPassword(
          this.loginForm.value.username.trim(),
          this.loginForm.value.password.trim()
        )
        .catch(() => {
          this.loginInProcess = false;
          this.showLoginError = true;
        });
    }
  }

  get showFormErrors(): boolean {
    return this.formSubmitted && !this.loginForm.valid;
  }
}
