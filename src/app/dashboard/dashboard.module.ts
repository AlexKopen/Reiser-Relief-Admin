import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { MissionTripsComponent } from './mission-trips/mission-trips.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MissionTripsComponent, NewsComponent]
})
export class DashboardModule {}
