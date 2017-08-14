import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {LogInComponent} from './home/log-in/log-in.component';
import {HomeButtonComponent} from './home/home-button/home-button.component';
import {ForgotPasswordComponent} from './home/forgot-password/forgot-password.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {AuthService} from './auth/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {Http, HttpModule, RequestOptions} from '@angular/http';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'token',
        tokenGetter: (() => localStorage.getItem('access_token')),
        globalHeaders: [{'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'authorization'}],
    }), http, options);
}

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        redirectTo: '/log-in',
        pathMatch: 'full'
    },
    {
        path: 'log-in',
        component: LogInComponent,
        data: {title: 'Log In'}
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {title: 'Log In'}
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {title: 'Password Recovery'}
    },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        LogInComponent,
        HomeButtonComponent,
        ForgotPasswordComponent,
        PageNotFoundComponent,
        HomeComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        HttpModule
    ],
    providers: [
        AuthService,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
