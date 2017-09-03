import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {LogInComponent} from './home/log-in/log-in.component';
import {HomeButtonComponent} from './home/home-button/home-button.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {AuthService} from './auth/auth.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {LogOutComponent} from './log-out/log-out.component';
import {DataService} from './shared/data.service';
import {DashboardTabComponent} from './dashboard/dashboard-tab/dashboard-tab.component';
import {NewsComponent} from './dashboard/news/news.component';
import {EventsComponent} from './dashboard/events/events.component';
import {ApplicationsComponent} from './dashboard/applications/applications.component';
import {NewsResultsComponent} from './dashboard/news/news-results/news-results.component';
import {SingleNewsResultComponent} from './dashboard/news/single-news-result/single-news-result.component';
import {AuthGuard} from './auth/auth-guard.service';
import {MyDatePickerModule} from 'mydatepicker';
import { SingleApplicationComponent } from './dashboard/applications/single-application/single-application.component';

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
        redirectTo: '/log-in'
    },
    {
        path: 'log-in',
        component: LogInComponent
    },
    {
        path: 'logout',
        component: LogOutComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard/news',
        component: NewsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard/events',
        component: EventsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard/applications',
        component: ApplicationsComponent,
        canActivate: [AuthGuard]
    },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        LogInComponent,
        HomeButtonComponent,
        PageNotFoundComponent,
        HomeComponent,
        DashboardComponent,
        LogOutComponent,
        DashboardTabComponent,
        NewsComponent,
        EventsComponent,
        ApplicationsComponent,
        NewsResultsComponent,
        SingleNewsResultComponent,
        SingleApplicationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        HttpModule,
        MyDatePickerModule
    ],
    providers: [
        AuthService,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        DataService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
