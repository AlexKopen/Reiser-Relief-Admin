import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MissionTripsComponent } from './dashboard/mission-trips/mission-trips.component';
import { NewsComponent } from './dashboard/news/news.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'callback',
        component: CallbackComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'mission-trips',
            component: MissionTripsComponent
          },
          {
            path: 'news',
            component: NewsComponent
          },
          {
            path: '',
            redirectTo: 'mission-trips',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}
