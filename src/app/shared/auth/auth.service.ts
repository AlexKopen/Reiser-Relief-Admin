import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import * as cookie from 'browser-cookies';

(window as any).global = window;

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  // @TODO: Update AUTH_CONFIG and remove .example extension in
  // src/app/auth/auth0-variables.ts.example
  private _Auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });
  accessToken: string;
  expiresAt: number;

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  logInError: boolean;
  logInError$ = new BehaviorSubject<boolean>(this.logInError);

  constructor() {
    // You can restore an unexpired authentication session on init
    // by using the checkSession() endpoint from auth0.js:
    // https://auth0.com/docs/libraries/auth0js/v9#using-checksession-to-acquire-new-tokens
  }

  private _setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login(username: String, password: String) {
    // Auth0 authorize request
    this._Auth0.login(
      {
        realm: 'Username-Password-Authentication',
        username: username,
        password: password
      },
      err => {
        this.logInError$.next(true);
      }
    );
  }

  handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    this._Auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
    });
  }

  getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
    this._Auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this._setSession(authResult, profile);
    });
  }

  private _setSession(authResult, profile) {
    // Save session data and update login status subject
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    this.accessToken = authResult.accessToken;
    this._setLoggedIn(true);
    cookie.set('accessToken', this.accessToken);
    cookie.set('expires', String(this.expiresAt));
  }

  logout() {
    // Remove token and profile, update login status subject,
    // and log out of Auth0 authentication session
    // This does a refresh and redirects back to homepage
    // Make sure you have the returnTo URL in your Auth0
    // Dashboard Application settings in Allowed Logout URLs
    cookie.erase('accessToken');
    cookie.erase('expires');
    this._Auth0.logout({
      returnTo: 'http://localhost:4200',
      clientID: AUTH_CONFIG.CLIENT_ID
    });
  }

  get authenticated(): boolean {
    return Date.now() < this.expiresAt && this.loggedIn;
  }

  setPreviousSessionCookies(): void {
    const currentAccessToken = cookie.get('accessToken');
    const currentExpires = Number(cookie.get('expires'));
    if (currentAccessToken && currentExpires) {
      this.accessToken = currentAccessToken;
      this.expiresAt = currentExpires;
      this._setLoggedIn(true);
    }
  }
}
