import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AUTH_CONFIG} from './auth0-variables';
import * as auth0 from 'auth0-js';
import {DataService} from '../shared/data.service';

@Injectable()
export class AuthService {

    // Configure Auth0
    auth0 = new auth0.WebAuth({
        domain: AUTH_CONFIG.domain,
        clientID: AUTH_CONFIG.clientID,
        redirectUri: AUTH_CONFIG.callbackURL,
        audience: `https://volzap.auth0.com/userinfo`,
        responseType: 'token id_token',
        scope: 'openid'
    });

    constructor(private router: Router, private loginState: DataService) {
    }

    public login(username: string, password: string): void {
        this.auth0.client.login({
            realm: 'Username-Password-Authentication',
            username,
            password
        }, (err, authResult) => {
            if (err) {
                console.log(err);
                this.loginState.setLoginUnsuccessful(true);
                return;
            } else if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.loginState.setShowNavBar(true);
            }
        });
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
                this.router.navigate(['/home']);
            } else if (err) {
                this.router.navigate(['/home']);
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify(
            (authResult.expiresIn * 1000) + new Date().getTime()
        );
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        this.router.navigate(['home']);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/home']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

}
