import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthService } from './shared/auth.service';
import { DataService } from './shared/data.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { NewsComponent } from './news/news.component';
import { ApplicationsComponent } from './applications/applications.component';
import { QuillModule } from 'ngx-quill';
import { NewsEntriesComponent } from './news-entries/news-entries.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { ModifyTripComponent } from './modify-trip/modify-trip.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { ApplicationSubmissionsComponent } from './application-submissions/application-submissions.component';
import { ApplicationViewComponent } from './application-view/application-view.component';


@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    LoginComponent,
    DashboardComponent,
    NavigationComponent,
    LoginFormComponent,
    SpinnerComponent,
    NewsComponent,
    ApplicationsComponent,
    NewsEntriesComponent,
    NewsEditComponent,
    ModifyTripComponent,
    AddTripComponent,
    ApplicationSubmissionsComponent,
    ApplicationViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    QuillModule
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
