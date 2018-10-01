import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { MissionTripsComponent } from './mission-trips/mission-trips.component';
import { AuthService } from '../shared/auth/auth.service';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [MissionTripsComponent, NewsComponent],
  providers: [AuthService]
})
export class DashboardModule {}
