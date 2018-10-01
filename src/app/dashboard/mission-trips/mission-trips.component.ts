import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { TripDate } from '../../shared/models/trip-date.model';

@Component({
  selector: 'app-mission-trips',
  templateUrl: './mission-trips.component.html',
  styleUrls: ['./mission-trips.component.scss']
})
export class MissionTripsComponent implements OnInit {
  tripDates: TripDate[];
  displayedColumns = ['id', 'status', 'trip-leader', 'date'];
  private showOld = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getTripDates$().subscribe(trips => {
      this.tripDates = trips;
    });
  }

  get loading(): boolean {
    return !this.tripDates || this.tripDates.length === 0;
  }

  get tripDatesFiltered(): TripDate[] {
    return this.showOld
      ? this.tripDates
      : this.tripDates.filter(tripDate => new Date(tripDate.date).getTime() >= Date.now());
  }

  showOldClick(): void {
    this.showOld = !this.showOld;
  }
}
